const model = {

/* ══════════════════════════════════════════════════════════════════════
   ADMINISTRATION & GOVERNANCE
══════════════════════════════════════════════════════════════════════ */
admin:{
  title:"Administration & Governance",
  desc:"Controls internal users, permissions, auditability, and administrative traceability. This block is intentionally kept internal-facing.",
  tables:[
    {name:"SystemUser", description:"Internal administrative user accounts.",
     fields:[
       ["pk","UserID",        "INT",          "NN", "Surrogate primary key, auto-increment"],
       ["",  "FullName",      "VARCHAR(120)",  "NN", "Full display name of the user"],
       ["",  "Email",         "VARCHAR(180)",  "NN", "Unique login email address"],
       ["",  "PasswordHash",  "VARCHAR(255)",  "NN", "Bcrypt hash of the password"],
       ["",  "RoleName",      "VARCHAR(60)",   "NN", "Role label: Admin, Manager, Support, etc."],
       ["",  "Department",    "VARCHAR(80)",  "NULL","Organisational department (optional)"],
       ["",  "IsActive",      "BOOLEAN",       "NN", "FALSE = soft-deleted or suspended account"],
       ["",  "LastLoginAt",   "DATETIME",     "NULL","Timestamp of most recent successful login"],
       ["",  "CreatedAt",     "DATETIME",      "NN", "Record creation timestamp (UTC)"],
       ["",  "UpdatedAt",     "DATETIME",      "NN", "Last modification timestamp (UTC)"]
     ]},
    {name:"Permission", description:"Master list of system permissions.",
     fields:[
       ["pk","PermissionID",   "INT",          "NN", "Surrogate primary key, auto-increment"],
       ["",  "PermissionCode", "VARCHAR(80)",  "NN", "Machine-readable code, e.g. ORDER_EDIT"],
       ["",  "PermissionName", "VARCHAR(120)", "NN", "Human-readable name"],
       ["",  "Description",    "VARCHAR(255)", "NULL","What the permission allows"]
     ]},
    {name:"UserPermission", description:"Junction table — permissions granted to users.",
     fields:[
       ["pk","UserPermissionID",  "INT",     "NN", "Surrogate primary key"],
       ["fk","UserID",            "INT",     "NN", "→ SystemUser.UserID"],
       ["fk","PermissionID",      "INT",     "NN", "→ Permission.PermissionID"],
       ["fk","GrantedByUserID",   "INT",     "NN", "→ SystemUser.UserID (who granted)"],
       ["",  "GrantedAt",         "DATETIME","NN", "When the permission was granted"]
     ]},
    {name:"AuditLog", description:"Immutable record of all administrative actions.",
     fields:[
       ["pk","AuditLogID",      "BIGINT",       "NN", "Auto-increment, supports high volume"],
       ["fk","UserID",          "INT",          "NN", "→ SystemUser.UserID (actor)"],
       ["",  "ActionType",      "VARCHAR(60)",  "NN", "CREATE, UPDATE, DELETE, LOGIN, etc."],
       ["",  "EntityName",      "VARCHAR(100)", "NN", "Table or entity affected"],
       ["",  "EntityID",        "VARCHAR(60)",  "NN", "PK value of the affected record"],
       ["",  "ActionDateTime",  "DATETIME",     "NN", "UTC timestamp of the action"],
       ["",  "OldValuesJson",   "JSON",         "NULL","Previous state snapshot (nullable on INSERT)"],
       ["",  "NewValuesJson",   "JSON",         "NULL","New state snapshot (nullable on DELETE)"],
       ["",  "Details",         "TEXT",         "NULL","Free-text notes or error context"]
     ]},
    {name:"SystemAuthorship", description:"Optional: tracks who built each module/page (dev metadata).",
     fields:[
       ["pk","AuthorshipID",         "INT",          "NN", "Surrogate primary key"],
       ["fk","UserID",               "INT",          "NN", "→ SystemUser.UserID"],
       ["",  "ArtifactType",         "VARCHAR(60)",  "NN", "PAGE, API, COMPONENT, SCRIPT, etc."],
       ["",  "ArtifactName",         "VARCHAR(120)", "NN", "Name of the artifact"],
       ["",  "ModuleName",           "VARCHAR(100)", "NULL","Parent module or package"],
       ["",  "VersionLabel",         "VARCHAR(40)",  "NULL","Semantic version, e.g. v1.2.0"],
       ["",  "RepositoryCommitHash", "VARCHAR(64)",  "NULL","Git commit SHA for traceability"]
     ]}
  ],
  relationships:[
    "SystemUser (1) → UserPermission (N)",
    "Permission (1) → UserPermission (N)",
    "SystemUser (1) → AuditLog (N)",
    "SystemUser (1) → SupplierOrder (N) via OrderedByUserID",
    "SystemUser (1) → OrderStatusHistory (N) via UpdatedByUserID"
  ],
  apis:["No mandatory third-party API"],
  presentation:"Administration is an internal control layer. SSO/OAuth could be layered on top later."
},

/* ══════════════════════════════════════════════════════════════════════
   CUSTOMER
══════════════════════════════════════════════════════════════════════ */
customer:{
  title:"Customer Block",
  desc:"Manages customer identity, addresses, personalisation preferences, and wish lists.",
  tables:[
    {name:"Customer", description:"Main customer account record.",
     fields:[
       ["pk","CustomerID",        "INT",          "NN", "Surrogate primary key, auto-increment"],
       ["",  "FirstName",         "VARCHAR(80)",  "NN", "Customer first name"],
       ["",  "LastName",          "VARCHAR(80)",  "NN", "Customer last name"],
       ["",  "Email",             "VARCHAR(180)", "NN", "Unique login/contact email address"],
       ["",  "Phone",             "VARCHAR(30)",  "NULL","Contact phone number"],
       ["",  "PasswordHash",      "VARCHAR(255)", "NN", "Bcrypt-hashed password"],
       ["",  "PreferredLanguage", "CHAR(5)",      "NULL","BCP-47 code, e.g. en-US, pt-BR"],
       ["",  "PreferredCurrency", "CHAR(3)",      "NULL","ISO 4217 code, e.g. USD, BRL"],
       ["",  "CreatedAt",         "DATETIME",     "NN", "Account creation timestamp (UTC)"],
       ["",  "UpdatedAt",         "DATETIME",     "NN", "Last profile update timestamp (UTC)"],
       ["",  "IsActive",          "BOOLEAN",      "NN", "FALSE = deactivated/deleted account"]
     ]},
    {name:"CustomerAddress", description:"Billing and shipping addresses per customer.",
     fields:[
       ["pk","CustomerAddressID", "INT",          "NN", "Surrogate primary key"],
       ["fk","CustomerID",        "INT",          "NN", "→ Customer.CustomerID"],
       ["",  "AddressType",       "VARCHAR(20)",  "NN", "BILLING or SHIPPING"],
       ["",  "RecipientName",     "VARCHAR(120)", "NN", "Name on the package or invoice"],
       ["",  "StreetLine1",       "VARCHAR(180)", "NN", "Primary street address"],
       ["",  "StreetLine2",       "VARCHAR(180)", "NULL","Apartment, suite, unit, etc."],
       ["",  "City",              "VARCHAR(80)",  "NN", "City name"],
       ["",  "StateProvince",     "VARCHAR(80)",  "NULL","State, province or region"],
       ["",  "PostalCode",        "VARCHAR(20)",  "NN", "ZIP or postal code"],
       ["",  "Country",           "CHAR(2)",      "NN", "ISO 3166-1 alpha-2 country code"],
       ["",  "IsDefaultShipping", "BOOLEAN",      "NN", "TRUE = default shipping address"],
       ["",  "IsDefaultBilling",  "BOOLEAN",      "NN", "TRUE = default billing address"]
     ]},
    {name:"CustomerPreference", description:"Personalisation and marketing preferences.",
     fields:[
       ["pk","CustomerPreferenceID","INT",         "NN", "Surrogate primary key"],
       ["fk","CustomerID",          "INT",         "NN", "→ Customer.CustomerID"],
       ["fk","PreferredTeamID",     "INT",         "NULL","→ Team.TeamID (nullable — no preference)"],
       ["",  "PreferredCategory",   "VARCHAR(80)", "NULL","Preferred product category slug"],
       ["",  "MarketingOptIn",      "BOOLEAN",     "NN", "TRUE = accepts marketing emails/SMS"]
     ]},
    {name:"WishList", description:"Products saved by the customer for future purchase.",
     fields:[
       ["pk","WishListID",  "INT",      "NN", "Surrogate primary key"],
       ["fk","CustomerID",  "INT",      "NN", "→ Customer.CustomerID"],
       ["fk","ProductID",   "INT",      "NN", "→ Product.ProductID"],
       ["",  "AddedAt",     "DATETIME", "NN", "Timestamp when the product was saved"]
     ]}
  ],
  relationships:[
    "Customer (1) → CustomerAddress (N)",
    "Customer (1) → CustomerPreference (1)",
    "Customer (1) → CustomerOrder (N)",
    "Customer (1) → WishList (N)"
  ],
  apis:["No mandatory third-party API"],
  presentation:"Customer data feeds orders and marketing. No mandatory external API is required at this level."
},

/* ══════════════════════════════════════════════════════════════════════
   MARKETING
══════════════════════════════════════════════════════════════════════ */
marketing:{
  title:"Marketing Block",
  desc:"Campaigns, promotions, coupon logic, featured matches, and behavioural analytics.",
  tables:[
    {name:"Campaign", description:"Top-level marketing campaign definition.",
     fields:[
       ["pk","CampaignID",   "INT",          "NN", "Surrogate primary key"],
       ["",  "CampaignName", "VARCHAR(120)", "NN", "Display name of the campaign"],
       ["",  "StartDate",    "DATE",         "NN", "Campaign start date"],
       ["",  "EndDate",      "DATE",         "NN", "Campaign end date (inclusive)"],
       ["",  "Channel",      "VARCHAR(60)",  "NULL","EMAIL, SMS, SOCIAL, PUSH, etc."],
       ["",  "Budget",       "DECIMAL(12,2)","NULL","Planned spend budget (optional)"]
     ]},
    {name:"Promotion", description:"Discount rule under a campaign.",
     fields:[
       ["pk","PromotionID",    "INT",           "NN", "Surrogate primary key"],
       ["fk","CampaignID",     "INT",           "NN", "→ Campaign.CampaignID"],
       ["",  "PromotionName",  "VARCHAR(120)",  "NN", "Display name"],
       ["",  "DiscountType",   "VARCHAR(20)",   "NN", "PERCENT, FIXED_AMOUNT, FREE_SHIPPING"],
       ["",  "DiscountValue",  "DECIMAL(10,2)", "NN", "Amount or percentage to deduct"],
       ["",  "MinOrderValue",  "DECIMAL(10,2)", "NULL","Minimum cart value to qualify"],
       ["",  "StartDate",      "DATE",          "NN", "Promotion start date"],
       ["",  "EndDate",        "DATE",          "NN", "Promotion end date (inclusive)"],
       ["",  "IsActive",       "BOOLEAN",       "NN", "FALSE = disabled / paused"]
     ]},
    {name:"Coupon", description:"Coupon code issued for a promotion.",
     fields:[
       ["pk","CouponID",       "INT",           "NN", "Surrogate primary key"],
       ["fk","PromotionID",    "INT",           "NN", "→ Promotion.PromotionID"],
       ["",  "CouponCode",     "VARCHAR(40)",   "NN", "Unique alphanumeric code entered by customer"],
       ["",  "UsageLimit",     "INT",           "NULL","Max total uses (NULL = unlimited)"],
       ["",  "UsedCount",      "INT",           "NN", "Current number of redemptions (default 0)"],
       ["",  "MinOrderValue",  "DECIMAL(10,2)", "NULL","Minimum subtotal to use the coupon"],
       ["",  "ExpirationDate", "DATE",          "NULL","Expiry date (NULL = no expiry)"],
       ["",  "IsActive",       "BOOLEAN",       "NN", "FALSE = revoked or expired"]
     ]},
    {name:"CouponRedemption", description:"Audit trail — which order used which coupon.",
     fields:[
       ["pk","RedemptionID",      "INT",           "NN", "Surrogate primary key"],
       ["fk","CouponID",          "INT",           "NN", "→ Coupon.CouponID"],
       ["fk","OrderID",           "INT",           "NN", "→ CustomerOrder.OrderID"],
       ["fk","CustomerID",        "INT",           "NN", "→ Customer.CustomerID"],
       ["",  "RedeemedAt",        "DATETIME",      "NN", "UTC timestamp of redemption"],
       ["",  "DiscountApplied",   "DECIMAL(10,2)", "NN", "Actual amount deducted on this order"]
     ]},
    {name:"Match", description:"Featured football match used for merchandising.",
     fields:[
       ["pk","MatchID",      "INT",          "NN", "Surrogate primary key"],
       ["fk","HomeTeamID",   "INT",          "NN", "→ Team.TeamID (home team)"],
       ["fk","AwayTeamID",   "INT",          "NN", "→ Team.TeamID (away team)"],
       ["",  "MatchDate",    "DATETIME",     "NN", "Scheduled match date and time (UTC)"],
       ["",  "Venue",        "VARCHAR(120)", "NULL","Venue or stadium name"],
       ["",  "Competition",  "VARCHAR(80)",  "NULL","Competition name, e.g. FIFA World Cup"]
     ]},
    {name:"MatchPromotion", description:"Junction table linking matches to promotions.",
     fields:[
       ["pk","MatchPromotionID","INT","NN","Surrogate primary key"],
       ["fk","MatchID",         "INT","NN","→ Match.MatchID"],
       ["fk","PromotionID",     "INT","NN","→ Promotion.PromotionID"]
     ]},
    {name:"ProductViewEvent", description:"Behavioural event captured for analytics and recommendations.",
     fields:[
       ["pk","EventID",       "BIGINT",      "NN", "Auto-increment; high-volume event log"],
       ["fk","CustomerID",    "INT",         "NULL","→ Customer.CustomerID (NULL = anonymous)"],
       ["fk","ProductID",     "INT",         "NN", "→ Product.ProductID"],
       ["",  "SessionID",     "VARCHAR(80)", "NULL","Browser/app session identifier"],
       ["",  "EventDateTime", "DATETIME",    "NN", "UTC timestamp of the page view"]
     ]}
  ],
  relationships:[
    "Campaign (1) → Promotion (N)",
    "Promotion (1) → Coupon (N)",
    "Coupon (1) → CouponRedemption (N)",
    "Match (N) ↔ Promotion (N) via MatchPromotion",
    "Customer (1) → ProductViewEvent (N)"
  ],
  apis:["Email / CRM API","Recommendation API","Analytics API"],
  presentation:"Marketing naturally depends on communication, analytics, and recommendation platforms."
},

/* ══════════════════════════════════════════════════════════════════════
   ORDER (Central Hub)
══════════════════════════════════════════════════════════════════════ */
order:{
  title:"Order Block",
  desc:"Central transaction hub. Records purchases, carts, item-level detail, post-purchase changes, and return requests.",
  tables:[
    {name:"CustomerOrder", description:"Main order header — one record per purchase.",
     fields:[
       ["pk","OrderID",            "INT",           "NN", "Surrogate primary key, auto-increment"],
       ["fk","CustomerID",         "INT",           "NN", "→ Customer.CustomerID"],
       ["fk","BillingAddressID",   "INT",           "NN", "→ CustomerAddress.CustomerAddressID"],
       ["fk","ShippingAddressID",  "INT",           "NN", "→ CustomerAddress.CustomerAddressID"],
       ["fk","PaymentMethodID",    "INT",           "NN", "→ PaymentMethod.PaymentMethodID"],
       ["fk","ShippingMethodID",   "INT",           "NN", "→ ShippingMethod.ShippingMethodID"],
       ["fk","CouponID",           "INT",           "NULL","→ Coupon.CouponID (NULL if no coupon)"],
       ["",  "OrderDate",          "DATETIME",      "NN", "UTC timestamp when the order was placed"],
       ["",  "OrderStatus",        "VARCHAR(30)",   "NN", "PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED"],
       ["",  "SubtotalAmount",     "DECIMAL(12,2)", "NN", "Sum of all line totals before discounts"],
       ["",  "DiscountAmount",     "DECIMAL(12,2)", "NN", "Total discount applied (coupon + promotions)"],
       ["",  "ShippingAmount",     "DECIMAL(10,2)", "NN", "Freight charge billed to the customer"],
       ["",  "TaxAmount",          "DECIMAL(10,2)", "NN", "Taxes calculated and applied at checkout"],
       ["",  "TotalAmount",        "DECIMAL(12,2)", "NN", "Final amount charged (subtotal - discount + shipping + tax)"],
       ["",  "Currency",           "CHAR(3)",       "NN", "ISO 4217 currency code, e.g. USD, BRL"],
       ["",  "OrderSnapshotJson",  "JSON",          "NULL","Full snapshot of prices and addresses at purchase time"]
     ]},
    {name:"OrderItem", description:"Line items — one record per product per order.",
     fields:[
       ["pk","OrderItemID",        "INT",           "NN", "Surrogate primary key"],
       ["fk","OrderID",            "INT",           "NN", "→ CustomerOrder.OrderID"],
       ["fk","ProductID",          "INT",           "NN", "→ Product.ProductID"],
       ["",  "Quantity",           "SMALLINT",      "NN", "Units ordered"],
       ["",  "UnitPrice",          "DECIMAL(10,2)", "NN", "Catalogue list price at time of order"],
       ["",  "PromoUnitPrice",     "DECIMAL(10,2)", "NULL","Promotional price if a promotion applied"],
       ["",  "FinalUnitPrice",     "DECIMAL(10,2)", "NN", "Actual price charged per unit"],
       ["",  "SelectedSize",       "VARCHAR(10)",   "NULL","Size chosen by the customer, e.g. M, XL"],
       ["",  "SelectedNumber",     "VARCHAR(10)",   "NULL","Player number personalisation (if any)"],
       ["",  "ProductSnapshotJson","JSON",          "NULL","Product name/image snapshot at purchase time"],
       ["",  "LineTotal",          "DECIMAL(12,2)", "NN", "FinalUnitPrice × Quantity"]
     ]},
    {name:"OrderStatusHistory", description:"Full lifecycle log of every status change on an order.",
     fields:[
       ["pk","OrderStatusHistoryID","INT",          "NN", "Surrogate primary key"],
       ["fk","OrderID",             "INT",          "NN", "→ CustomerOrder.OrderID"],
       ["fk","UpdatedByUserID",     "INT",          "NN", "→ SystemUser.UserID (admin actor)"],
       ["",  "Status",              "VARCHAR(30)",  "NN", "New status value applied"],
       ["",  "StatusDateTime",      "DATETIME",     "NN", "UTC timestamp of the status change"],
       ["",  "Notes",               "TEXT",         "NULL","Internal notes about the transition"]
     ]},
    {name:"Cart", description:"Pre-checkout shopping cart (guest or logged-in).",
     fields:[
       ["pk","CartID",      "INT",          "NN", "Surrogate primary key"],
       ["fk","CustomerID",  "INT",          "NULL","→ Customer.CustomerID (NULL = guest session)"],
       ["",  "SessionID",   "VARCHAR(80)",  "NULL","Browser session ID for guest carts"],
       ["",  "CreatedAt",   "DATETIME",     "NN", "Cart creation timestamp (UTC)"],
       ["",  "UpdatedAt",   "DATETIME",     "NN", "Last item add/remove timestamp (UTC)"]
     ]},
    {name:"CartItem", description:"Products currently held in a cart.",
     fields:[
       ["pk","CartItemID",   "INT",         "NN", "Surrogate primary key"],
       ["fk","CartID",       "INT",         "NN", "→ Cart.CartID"],
       ["fk","ProductID",    "INT",         "NN", "→ Product.ProductID"],
       ["",  "Quantity",     "SMALLINT",    "NN", "Units in the cart"],
       ["",  "SelectedSize", "VARCHAR(10)", "NULL","Size selected by customer"]
     ]},
    {name:"ReturnRequest", description:"Return or exchange request linked to a prior order.",
     fields:[
       ["pk","ReturnRequestID","INT",          "NN", "Surrogate primary key"],
       ["fk","OrderID",        "INT",          "NN", "→ CustomerOrder.OrderID"],
       ["fk","OrderItemID",    "INT",          "NN", "→ OrderItem.OrderItemID"],
       ["",  "Reason",         "VARCHAR(255)", "NN", "Customer-provided return reason"],
       ["",  "Status",         "VARCHAR(30)",  "NN", "REQUESTED, APPROVED, REJECTED, COMPLETED"],
       ["",  "RequestDate",    "DATETIME",     "NN", "UTC timestamp of the return request"]
     ]}
  ],
  relationships:[
    "Customer (1) → CustomerOrder (N)",
    "CustomerOrder (1) → OrderItem (N)",
    "CustomerOrder (1) ↔ Payment (N)",
    "CustomerOrder (1) ↔ Shipment (N)",
    "Customer (1) → Cart (N)",
    "Cart (1) → CartItem (N)",
    "CustomerOrder (1) → ReturnRequest (N)"
  ],
  apis:["Fraud / Risk API","Tax Calculation API"],
  presentation:"Order is the natural place for risk and tax integrations because both are tightly coupled to checkout."
},

/* ══════════════════════════════════════════════════════════════════════
   PRODUCT CATALOG
══════════════════════════════════════════════════════════════════════ */
catalog:{
  title:"Product Catalog",
  desc:"Flexible product catalogue supporting categories, teams, inventory tracking, and media assets.",
  tables:[
    {name:"Product", description:"Master product record — every SKU in the store.",
     fields:[
       ["pk","ProductID",    "INT",           "NN", "Surrogate primary key, auto-increment"],
       ["fk","CategoryID",   "INT",           "NN", "→ ProductCategory.CategoryID"],
       ["fk","TeamID",       "INT",           "NULL","→ Team.TeamID (NULL = not team-specific)"],
       ["fk","SupplierID",   "INT",           "NULL","→ Supplier.SupplierID (NULL = internal)"],
       ["",  "SKU",          "VARCHAR(80)",   "NN", "Unique stock-keeping unit code"],
       ["",  "ProductName",  "VARCHAR(180)",  "NN", "Display name shown on product page"],
       ["",  "ProductType",  "VARCHAR(60)",   "NN", "JERSEY, TRAINING_KIT, ACCESSORY, etc."],
       ["",  "Audience",     "VARCHAR(40)",   "NULL","MENS, WOMENS, KIDS, UNISEX"],
       ["",  "Description",  "TEXT",          "NULL","Full product description (HTML/Markdown)"],
       ["",  "ListPrice",    "DECIMAL(10,2)", "NN", "Standard retail price"],
       ["",  "PromoPrice",   "DECIMAL(10,2)", "NULL","Promotional price when on sale"],
       ["",  "Weight",       "DECIMAL(8,3)",  "NULL","Weight in kilograms (for shipping calculation)"],
       ["",  "IsActive",     "BOOLEAN",       "NN", "FALSE = draft or discontinued product"],
       ["",  "ProductJson",  "JSON",          "NULL","Flexible attributes: fabric, badge, edition, etc."]
     ]},
    {name:"ProductCategory", description:"Category hierarchy (self-referencing for subcategories).",
     fields:[
       ["pk","CategoryID",       "INT",          "NN", "Surrogate primary key"],
       ["fk","ParentCategoryID", "INT",          "NULL","→ ProductCategory.CategoryID (NULL = root)"],
       ["",  "CategoryName",     "VARCHAR(100)", "NN", "Display name, e.g. Jerseys, Accessories"],
       ["",  "Description",      "VARCHAR(255)", "NULL","Short category description"],
       ["",  "IsActive",         "BOOLEAN",      "NN", "FALSE = hidden from storefront"]
     ]},
    {name:"Team", description:"National football team entity linked to products and matches.",
     fields:[
       ["pk","TeamID",        "INT",          "NN", "Surrogate primary key"],
       ["",  "TeamName",      "VARCHAR(100)", "NN", "Full team name, e.g. Brazil National Team"],
       ["",  "Confederation", "VARCHAR(40)",  "NULL","FIFA confederation: UEFA, CONMEBOL, etc."],
       ["",  "CountryCode",   "CHAR(3)",      "NN", "ISO 3166-1 alpha-3 country code"],
       ["",  "FlagImageUrl",  "VARCHAR(255)", "NULL","CDN URL of the team flag image"]
     ]},
    {name:"ProductInventory", description:"Stock levels per product and size.",
     fields:[
       ["pk","InventoryID",        "INT",          "NN", "Surrogate primary key"],
       ["fk","ProductID",          "INT",          "NN", "→ Product.ProductID"],
       ["",  "Size",               "VARCHAR(10)",  "NN", "XS, S, M, L, XL, XXL, or numeric"],
       ["",  "AvailableQuantity",  "INT",          "NN", "Units available for purchase"],
       ["",  "ReservedQuantity",   "INT",          "NN", "Units held in active carts or pending orders"],
       ["",  "WarehouseLocation",  "VARCHAR(60)",  "NULL","Bin/rack/zone code in the warehouse"],
       ["",  "UpdatedAt",          "DATETIME",     "NN", "Last stock adjustment timestamp (UTC)"]
     ]},
    {name:"ProductMedia", description:"Images and media assets displayed on product pages.",
     fields:[
       ["pk","ProductMediaID","INT",          "NN", "Surrogate primary key"],
       ["fk","ProductID",     "INT",          "NN", "→ Product.ProductID"],
       ["",  "MediaType",     "VARCHAR(20)",  "NN", "IMAGE, VIDEO, THUMBNAIL"],
       ["",  "MediaUrl",      "VARCHAR(255)", "NN", "CDN URL of the media asset"],
       ["",  "DisplayOrder",  "SMALLINT",     "NN", "Sort position in the product gallery"],
       ["",  "IsPrimary",     "BOOLEAN",      "NN", "TRUE = main cover image for listings"]
     ]}
  ],
  relationships:[
    "ProductCategory (1) → Product (N)",
    "ProductCategory self-references via ParentCategoryID for subcategories",
    "Team (1) → Product (N)",
    "Supplier (1) → Product (N)",
    "Product (1) → ProductInventory (N)",
    "Product (1) → ProductMedia (N)"
  ],
  apis:["No mandatory external API"],
  presentation:"Catalog could integrate with search or CDN services later, but those are optional platform choices."
},

/* ══════════════════════════════════════════════════════════════════════
   SUPPLIER & PROCUREMENT
══════════════════════════════════════════════════════════════════════ */
supplier:{
  title:"Supplier & Procurement",
  desc:"Supplier management, purchase orders, inbound inventory flow, and supplier-side catalogue mapping.",
  tables:[
    {name:"Supplier", description:"Supplier master record.",
     fields:[
       ["pk","SupplierID",    "INT",          "NN", "Surrogate primary key, auto-increment"],
       ["",  "SupplierName",  "VARCHAR(120)", "NN", "Legal or trading name of the supplier"],
       ["",  "ContactName",   "VARCHAR(100)", "NULL","Primary contact person"],
       ["",  "ContactEmail",  "VARCHAR(180)", "NULL","Contact email address"],
       ["",  "ContactPhone",  "VARCHAR(30)",  "NULL","Contact phone number"],
       ["",  "Country",       "CHAR(2)",      "NN", "ISO 3166-1 alpha-2 country code"],
       ["",  "LeadTimeDays",  "SMALLINT",     "NULL","Typical fulfilment lead time in days"],
       ["",  "IsActive",      "BOOLEAN",      "NN", "FALSE = no longer sourcing from this supplier"]
     ]},
    {name:"SupplierOrder", description:"Purchase order sent to a supplier.",
     fields:[
       ["pk","SupplierOrderID",     "INT",           "NN", "Surrogate primary key"],
       ["fk","SupplierID",          "INT",           "NN", "→ Supplier.SupplierID"],
       ["fk","OrderedByUserID",     "INT",           "NN", "→ SystemUser.UserID (purchasing manager)"],
       ["",  "SupplierOrderDate",   "DATE",          "NN", "Date the PO was issued"],
       ["",  "ExpectedDeliveryDate","DATE",          "NULL","Agreed delivery date"],
       ["",  "ActualDeliveryDate",  "DATE",          "NULL","Date goods were received (NULL = pending)"],
       ["",  "SupplierOrderStatus", "VARCHAR(30)",   "NN", "DRAFT, SENT, CONFIRMED, RECEIVED, CANCELLED"],
       ["",  "TotalCost",           "DECIMAL(12,2)", "NN", "Total cost of the purchase order"],
       ["",  "Currency",            "CHAR(3)",       "NN", "ISO 4217 code of the PO currency"]
     ]},
    {name:"SupplierOrderItem", description:"Line items in a supplier purchase order.",
     fields:[
       ["pk","SupplierOrderItemID","INT",           "NN", "Surrogate primary key"],
       ["fk","SupplierOrderID",    "INT",           "NN", "→ SupplierOrder.SupplierOrderID"],
       ["fk","ProductID",          "INT",           "NN", "→ Product.ProductID"],
       ["",  "Quantity",           "INT",           "NN", "Units ordered from supplier"],
       ["",  "UnitCost",           "DECIMAL(10,2)", "NN", "Cost per unit (excluding tax/duties)"],
       ["",  "ReceivedQuantity",   "INT",           "NN", "Units actually received (default 0)"],
       ["",  "ItemStatus",         "VARCHAR(30)",   "NN", "PENDING, PARTIAL, COMPLETE, CANCELLED"]
     ]},
    {name:"SupplierCatalog", description:"Supplier SKU mapping to internal products.",
     fields:[
       ["pk","SupplierCatalogID","INT",           "NN", "Surrogate primary key"],
       ["fk","SupplierID",       "INT",           "NN", "→ Supplier.SupplierID"],
       ["fk","ProductID",        "INT",           "NN", "→ Product.ProductID"],
       ["",  "SupplierSku",      "VARCHAR(80)",   "NN", "Supplier's own product code"],
       ["",  "SupplierPrice",    "DECIMAL(10,2)", "NULL","Last known supplier unit price"]
     ]}
  ],
  relationships:[
    "Supplier (1) → SupplierOrder (N)",
    "SupplierOrder (1) → SupplierOrderItem (N)",
    "Product (1) → SupplierOrderItem (N)",
    "Supplier (1) → SupplierCatalog (N)"
  ],
  apis:["Supplier / EDI API","Inventory Sync API"],
  presentation:"Procurement relies on supplier portals, EDI feeds, and inventory sync APIs."
},

/* ══════════════════════════════════════════════════════════════════════
   PAYMENT
══════════════════════════════════════════════════════════════════════ */
payment:{
  title:"Payment Block",
  desc:"Payment methods, gateway processing, detailed transaction events, and refunds.",
  tables:[
    {name:"PaymentMethod", description:"Accepted payment method types and their providers.",
     fields:[
       ["pk","PaymentMethodID","INT",          "NN", "Surrogate primary key"],
       ["",  "MethodName",     "VARCHAR(60)",  "NN", "CREDIT_CARD, PIX, BOLETO, PAYPAL, etc."],
       ["",  "ProviderName",   "VARCHAR(80)",  "NN", "Stripe, PagSeguro, Mercado Pago, etc."],
       ["",  "Description",    "VARCHAR(255)", "NULL","Display description shown at checkout"],
       ["",  "IsActive",       "BOOLEAN",      "NN", "FALSE = method disabled / not offered"]
     ]},
    {name:"Payment", description:"Payment record linked to an order.",
     fields:[
       ["pk","PaymentID",            "INT",           "NN", "Surrogate primary key"],
       ["fk","OrderID",              "INT",           "NN", "→ CustomerOrder.OrderID"],
       ["fk","PaymentMethodID",      "INT",           "NN", "→ PaymentMethod.PaymentMethodID"],
       ["",  "PaymentDate",          "DATETIME",      "NN", "UTC timestamp of payment submission"],
       ["",  "PaymentStatus",        "VARCHAR(30)",   "NN", "PENDING, AUTHORIZED, CAPTURED, FAILED, REFUNDED"],
       ["",  "TransactionReference", "VARCHAR(120)",  "NULL","Gateway-assigned transaction ID"],
       ["",  "AmountPaid",           "DECIMAL(12,2)", "NN", "Total amount submitted to the gateway"],
       ["",  "Currency",             "CHAR(3)",       "NN", "ISO 4217 currency code"],
       ["",  "AuthorizationCode",    "VARCHAR(80)",   "NULL","Card authorisation code from issuing bank"]
     ]},
    {name:"PaymentTransaction", description:"Detailed gateway event log per payment.",
     fields:[
       ["pk","PaymentTransactionID","INT",          "NN", "Surrogate primary key"],
       ["fk","PaymentID",           "INT",          "NN", "→ Payment.PaymentID"],
       ["",  "GatewayName",         "VARCHAR(80)",  "NN", "Name of the payment gateway used"],
       ["",  "TransactionType",     "VARCHAR(40)",  "NN", "AUTHORISE, CAPTURE, VOID, REFUND"],
       ["",  "TransactionStatus",   "VARCHAR(30)",  "NN", "SUCCESS, DECLINED, ERROR, PENDING"],
       ["",  "GatewayResponseJson", "JSON",         "NULL","Full raw response payload from gateway"],
       ["",  "ProcessedAt",         "DATETIME",     "NN", "UTC timestamp of the gateway response"]
     ]},
    {name:"Refund", description:"Refund event tied to a prior payment.",
     fields:[
       ["pk","RefundID",               "INT",           "NN", "Surrogate primary key"],
       ["fk","PaymentID",              "INT",           "NN", "→ Payment.PaymentID"],
       ["fk","OrderID",                "INT",           "NN", "→ CustomerOrder.OrderID"],
       ["",  "RefundAmount",           "DECIMAL(10,2)", "NN", "Amount to be refunded"],
       ["",  "Currency",               "CHAR(3)",       "NN", "ISO 4217 currency code"],
       ["",  "RefundReason",           "VARCHAR(255)",  "NN", "CUSTOMER_REQUEST, DEFECT, DUPLICATE, etc."],
       ["",  "RefundStatus",           "VARCHAR(30)",   "NN", "REQUESTED, PROCESSING, COMPLETED, FAILED"],
       ["",  "GatewayRefundReference", "VARCHAR(120)",  "NULL","Gateway-assigned refund transaction ID"],
       ["",  "RefundedAt",             "DATETIME",      "NULL","UTC timestamp when refund was completed"]
     ]}
  ],
  relationships:[
    "PaymentMethod (1) → Payment (N)",
    "CustomerOrder (1) ↔ Payment (N)",
    "Payment (1) → PaymentTransaction (N)",
    "Payment (1) → Refund (N)"
  ],
  apis:["Payment Gateway API"],
  presentation:"Payment block needs the gateway/processor. Fraud detection is kept in the Order/checkout domain."
},

/* ══════════════════════════════════════════════════════════════════════
   SHIPPING & DELIVERY
══════════════════════════════════════════════════════════════════════ */
shipping:{
  title:"Shipping & Delivery",
  desc:"Shipping method configuration, freight rate tables, shipment execution, carrier tracking events, and carrier master data.",
  tables:[
    {name:"ShippingMethod", description:"Available freight methods and service levels.",
     fields:[
       ["pk","ShippingMethodID",  "INT",         "NN", "Surrogate primary key"],
       ["",  "MethodName",        "VARCHAR(80)", "NN", "Standard, Express, Overnight, Click & Collect, etc."],
       ["",  "CarrierName",       "VARCHAR(80)", "NN", "Carrier brand: Correios, DHL, FedEx, UPS, etc."],
       ["",  "EstimatedMinDays",  "SMALLINT",    "NN", "Minimum estimated transit days"],
       ["",  "EstimatedMaxDays",  "SMALLINT",    "NN", "Maximum estimated transit days"],
       ["",  "IsActive",          "BOOLEAN",     "NN", "FALSE = method not available at checkout"]
     ]},
    {name:"ShippingRate", description:"Freight pricing by destination and package weight band.",
     fields:[
       ["pk","ShippingRateID",    "INT",           "NN", "Surrogate primary key"],
       ["fk","ShippingMethodID",  "INT",           "NN", "→ ShippingMethod.ShippingMethodID"],
       ["",  "DestinationCountry","CHAR(2)",       "NN", "ISO 3166-1 alpha-2 destination country"],
       ["",  "DestinationState",  "VARCHAR(40)",   "NULL","State/province (NULL = applies to entire country)"],
       ["",  "WeightMin",         "DECIMAL(8,3)",  "NN", "Lower bound of weight band (kg, inclusive)"],
       ["",  "WeightMax",         "DECIMAL(8,3)",  "NN", "Upper bound of weight band (kg, inclusive)"],
       ["",  "Price",             "DECIMAL(10,2)", "NN", "Freight charge for this band"],
       ["",  "Currency",          "CHAR(3)",       "NN", "ISO 4217 currency code"]
     ]},
    {name:"Shipment", description:"Operational shipment record created when an order is dispatched.",
     fields:[
       ["pk","ShipmentID",            "INT",          "NN", "Surrogate primary key"],
       ["fk","OrderID",               "INT",          "NN", "→ CustomerOrder.OrderID"],
       ["fk","ShippingMethodID",      "INT",          "NN", "→ ShippingMethod.ShippingMethodID"],
       ["",  "TrackingNumber",        "VARCHAR(60)",  "NULL","Carrier-assigned tracking number"],
       ["",  "ShipmentStatus",        "VARCHAR(30)",  "NN", "PREPARING, DISPATCHED, IN_TRANSIT, DELIVERED, RETURNED"],
       ["",  "PackageWeight",         "DECIMAL(8,3)", "NULL","Actual weighed package weight (kg)"],
       ["",  "PackageDimensionsJson", "JSON",         "NULL","Length, width, height in cm"],
       ["",  "EstimatedDeliveryDate", "DATE",         "NULL","Carrier-provided estimated delivery date"],
       ["",  "DeliveredDate",         "DATE",         "NULL","Actual delivery date (NULL until delivered)"]
     ]},
    {name:"ShipmentTrackingEvent", description:"Carrier tracking milestones pushed from the carrier API.",
     fields:[
       ["pk","TrackingEventID",  "INT",          "NN", "Surrogate primary key"],
       ["fk","ShipmentID",       "INT",          "NN", "→ Shipment.ShipmentID"],
       ["",  "EventStatus",      "VARCHAR(60)",  "NN", "PICKED_UP, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED, etc."],
       ["",  "EventDateTime",    "DATETIME",     "NN", "UTC timestamp of the carrier event"],
       ["",  "EventLocation",    "VARCHAR(120)", "NULL","City or facility name reported by carrier"],
       ["",  "EventDescription", "VARCHAR(255)", "NULL","Human-readable event detail from carrier"]
     ]},
    {name:"Carrier", description:"Carrier master data for integration and display.",
     fields:[
       ["pk","CarrierID",        "INT",         "NN", "Surrogate primary key"],
       ["",  "CarrierName",      "VARCHAR(80)", "NN", "Display name, e.g. DHL Express"],
       ["",  "CarrierCode",      "VARCHAR(20)", "NN", "Short integration code, e.g. DHL, FEDEX, COR"],
       ["",  "SupportsTracking", "BOOLEAN",     "NN", "TRUE = carrier provides tracking events API"]
     ]}
  ],
  relationships:[
    "ShippingMethod (1) → ShippingRate (N)",
    "ShippingMethod (1) ↔ Shipment (N)",
    "CustomerOrder (1) ↔ Shipment (N)",
    "Shipment (1) → ShipmentTrackingEvent (N)"
  ],
  apis:["Shipping Rate API","Carrier Tracking API","Address Validation API"],
  presentation:"Shipping naturally depends on freight quotation, tracking, and address validation from multiple providers."
}

};

/* ─────────────────────────────────────────────────────────────────────────
   CONNECTOR SYSTEM
   Layout (after swap):
     row1: title | admin    | supplier
     row2: cust  | ORDER    | catalog
     row3: ship  | payment  | marketing   ← marketing now beside catalog
   ───────────────────────────────────────────────────────────────────────── */



/* Arrowhead markers — forward and reverse for bidirectional connectors */

function addDefs(svg){
  const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
  // forward arrowheads (marker-end)
  [['arr','#9cc6ad'],['arr-d','#a8cfb8']].forEach(([id,fill])=>{
    const m=document.createElementNS('http://www.w3.org/2000/svg','marker');
    m.setAttribute('id',id);m.setAttribute('markerWidth','8');m.setAttribute('markerHeight','6');
    m.setAttribute('refX','6');m.setAttribute('refY','3');m.setAttribute('orient','auto');
    const p=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    p.setAttribute('points','0 0,8 3,0 6');p.setAttribute('fill',fill);
    m.appendChild(p);defs.appendChild(m);
  });
  // reverse arrowheads (marker-start) — same shape, opposite orient
  [['arr-r','#9cc6ad'],['arr-dr','#a8cfb8']].forEach(([id,fill])=>{
    const m=document.createElementNS('http://www.w3.org/2000/svg','marker');
    m.setAttribute('id',id);m.setAttribute('markerWidth','8');m.setAttribute('markerHeight','6');
    m.setAttribute('refX','2');m.setAttribute('refY','3');m.setAttribute('orient','auto-start-reverse');
    const p=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    p.setAttribute('points','0 0,8 3,0 6');p.setAttribute('fill',fill);
    m.appendChild(p);defs.appendChild(m);
  });
  svg.appendChild(defs);
}

/* Label with white pill – always readable above everything */
function addLabel(svg,text,x,y){
  const dark=getComputedStyle(document.documentElement).getPropertyValue('--dark').trim();
  const bord=getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
  /* text node */
  const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
  lbl.setAttribute('x',x);lbl.setAttribute('y',y);
  lbl.setAttribute('text-anchor','middle');lbl.setAttribute('dominant-baseline','middle');
  lbl.setAttribute('font-size','10.5');lbl.setAttribute('font-family','Inter,Segoe UI,Arial,sans-serif');
  lbl.setAttribute('font-weight','600');lbl.setAttribute('fill',dark);
  lbl.textContent=text;
  svg.appendChild(lbl);
  /* background rect drawn BEFORE the text so text stays on top */
  const box=lbl.getBBox();
  const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
  rect.setAttribute('x',box.x-7);rect.setAttribute('y',box.y-4);
  rect.setAttribute('width',box.width+14);rect.setAttribute('height',box.height+8);
  rect.setAttribute('rx','10');rect.setAttribute('fill','#fff');
  rect.setAttribute('stroke',bord);rect.setAttribute('stroke-width','1');
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');
  g.appendChild(rect);g.appendChild(lbl);svg.appendChild(g);
}

function drawConnectors(){
  const svg=document.getElementById('svgLayer');
  const diag=document.getElementById('diagram');
  svg.setAttribute('width',diag.clientWidth);
  svg.setAttribute('height',diag.clientHeight);
  svg.innerHTML='';
  addDefs(svg);

  const dr=diag.getBoundingClientRect();
  const q=id=>document.querySelector('.block.'+id);

  /* Point on a block edge: side L/R/T/B, frac 0-1 along that edge */
  function pt(el,side,frac){
    frac=frac===undefined?0.5:frac;
    const r=el.getBoundingClientRect();
    const L=r.left-dr.left, T=r.top-dr.top;
    if(side==='L') return {x:L,             y:T+r.height*frac};
    if(side==='R') return {x:L+r.width,     y:T+r.height*frac};
    if(side==='T') return {x:L+r.width*frac,y:T};
    if(side==='B') return {x:L+r.width*frac,y:T+r.height};
  }

  const eOrder=q('order'), eCust=q('customer'), eCat=q('catalog'),
        ePay=q('payment'), eMkt=q('marketing'), eShip=q('shipping'),
        eAdmin=q('admin'), eSupp=q('supplier');

  /* Corridor centres (middle of each gap between blocks) */
  const cV12 = (pt(eCust,'R').x  + pt(eOrder,'L').x) / 2;  // col-gap col1↔col2
  const cV23 = (pt(eOrder,'R').x + pt(eCat,'L').x)   / 2;  // col-gap col2↔col3
  const cH23 = (pt(eOrder,'B').y + pt(ePay,'T').y)   / 2;  // row-gap row2↔row3

  /* Draw a polyline path + label at its geometric midpoint.
     bidir=true adds a reverse arrowhead at the start as well. */
    function conn(pts, dashed, label, bidir, labelOffsetY = 0) {
    let d = 'M ' + pts[0].x + ' ' + pts[0].y;
    for(let i=1;i<pts.length;i++) d+=' L '+pts[i].x+' '+pts[i].y;

    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',d);
    path.setAttribute('fill','none');
    path.setAttribute('stroke',dashed?'#86c9a8':'#9cc6ad');
    path.setAttribute('stroke-width',dashed?'1.8':'2.2');
    if(dashed) path.setAttribute('stroke-dasharray','7 6');
    path.setAttribute('stroke-linecap','round');
    path.setAttribute('stroke-linejoin','round');
    path.setAttribute('marker-end',  dashed?'url(#arr-d)' :'url(#arr)');
    if(bidir) path.setAttribute('marker-start', dashed?'url(#arr-dr)':'url(#arr-r)');
    svg.appendChild(path);

    /* True midpoint of the rendered path */
    let lx,ly;
    try{
      const half=path.getTotalLength()/2;
      const m=path.getPointAtLength(half);
      lx=m.x; ly=m.y;
    }catch(e){
      lx=pts.reduce((s,p)=>s+p.x,0)/pts.length;
      ly=pts.reduce((s,p)=>s+p.y,0)/pts.length;
    }
    addLabel(svg, label, lx, ly + labelOffsetY);
  }

  /* ── DIRECT connections (same row or same column) ──────────────────────── */




    function addLabel(svg, text, x, y) {
        const dark = getComputedStyle(document.documentElement).getPropertyValue('--dark').trim();
        const bord = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();

        const lines = Array.isArray(text) ? text : [text];
        const lineHeightEm = 1.2;

        const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lbl.setAttribute('x', x);
        lbl.setAttribute('y', y);
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('font-size', '10.5');
        lbl.setAttribute('font-family', 'Inter,Segoe UI,Arial,sans-serif');
        lbl.setAttribute('font-weight', '600');
        lbl.setAttribute('fill', dark);

        lines.forEach((line, index) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', x);

            if (index === 0) {
                const offset = -((lines.length - 1) * lineHeightEm) / 2;
                tspan.setAttribute('dy', `${offset}em`);
            } else {
                tspan.setAttribute('dy', `${lineHeightEm}em`);
            }

            tspan.textContent = line;
            lbl.appendChild(tspan);
        });

        svg.appendChild(lbl);

        const box = lbl.getBBox();
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', box.x - 7);
        rect.setAttribute('y', box.y - 4);
        rect.setAttribute('width', box.width + 14);
        rect.setAttribute('height', box.height + 8);
        rect.setAttribute('rx', '10');
        rect.setAttribute('fill', '#fff');
        rect.setAttribute('stroke', bord);
        rect.setAttribute('stroke-width', '1');

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.appendChild(rect);
        g.appendChild(lbl);
        svg.appendChild(g);
    }



  /* 1. customer → order  (same row, horizontal) */
    conn(
        [pt(eCust, 'R', 0.45), pt(eOrder, 'L', 0.40)],
        false,
        ['CustomerID', '+', 'AddressIDs']
    );

  /* 2. catalog → order  (same row, horizontal) */
  conn([ pt(eCat,'L',0.45),   pt(eOrder,'R',0.40) ], false, 'ProductID');

  /* 3. payment ↔ order  (same column, vertical) — BIDIRECTIONAL
        Order.PaymentMethodID → PaymentMethod  AND  Payment.OrderID → CustomerOrder */
  conn([pt(ePay, 'T', 0.50), pt(eOrder, 'B', 0.50)], false, 'OrderID + PaymentMethodID', true, 6);

  /* 4. admin → order  (same column, vertical) */
  conn([ pt(eAdmin,'B',0.45), pt(eOrder,'T',0.45) ], false, 'UpdatedByUserID');

  /* 5. supplier → catalog  (same column, vertical) */
  conn([ pt(eSupp,'B',0.50),  pt(eCat,'T',0.50)  ], false, 'SupplierID', true, -1);

  /* 6. marketing → catalog  NOW same column (col3), direct vertical ─────── */
  conn([ pt(eMkt,'T',0.50),   pt(eCat,'B',0.50)  ], true,  'TeamID / Product signals');

  /* ── CORRIDOR connections (diagonal, route through gap channels) ───────── */

  /* 7. shipping ↔ order — BIDIRECTIONAL
        Order.ShippingMethodID → ShippingMethod  AND  Shipment.OrderID → CustomerOrder
       Enter Order from the LEFT SIDE at 80% height. */
  {
    const s = pt(eShip,'T',0.55);
    const e = pt(eOrder,'L',0.80);         // left side of order, 80% down from top
    conn([
      s,
      {x:s.x,  y:cH23},                   // up to row-gap corridor
      {x:cV12, y:cH23},                   // right along corridor to col1-col2 gap
      {x:cV12, y:e.y},                    // up col-gap to target height
      e                                    // → RIGHT into order left side ← arrow correct
    ], false, ['OrderID', '+', 'ShippingMethodID'], true);
  }

  /* 8. marketing ↔ order  (dashed) — BIDIRECTIONAL
        Order.CouponID → Coupon  AND  CouponRedemption.OrderID → CustomerOrder */
  {
    const s = pt(eMkt,'T',0.45);           // marketing top, slightly left of centre
    const e = pt(eOrder,'B',0.78);         // order bottom, right quarter
    conn([
      s,
      {x:s.x,  y:cH23},                   // up to row-gap corridor
      {x:e.x,  y:cH23},                   // left along corridor to order's x-position
      e                                    // straight UP into order bottom ↑ arrow correct
    ], true, 'CouponID / OrderID', true, 3);
  }
}
function renderTooltip(id){
  const d = model[id];
  const el = document.getElementById("tt-" + id);
  if(!el) return;
  el.innerHTML = `<h4>${d.title}</h4><p class="tt-text">${d.desc}</p><div class="tt-sub">Key tables</div><div class="tt-list">${d.tables.slice(0,3).map(t => `<div class="tt-item"><strong>${t.name}</strong><span>${t.fields.slice(0,5).map(f => f[1]).join(" • ")}</span></div>`).join("")}</div><div class="tt-sub">Connected APIs</div><div class="api-row">${d.apis.map(a => `<span class="mini ${a.includes('API') ? 'api' : ''}">${a}</span>`).join("")}</div>`;
}
function renderDetail(id){
  const d = model[id];
  const titleEl = document.getElementById("detailTitle");
  if(!titleEl) return;
  document.getElementById("detailTitle").textContent = d.title;
  document.getElementById("detailDesc").textContent = d.desc;
  document.getElementById("tableList").innerHTML = d.tables.map(t => {
    const rows = t.fields.map(f => {
      // f = [key, name, type, nullable, description]
      const [key, name, type, nullable, desc] = f;
      const keyHtml = key
        ? `<span class="pill ${key}" style="font-size:9px">${key.toUpperCase()}</span>`
        : `<span style="color:#ccc;font-size:10px">—</span>`;
      const nullHtml = nullable === 'NULL'
        ? `<span class="null-yes">NULL</span>`
        : `<span class="null-no">NN</span>`;
      return `<tr>
        <td class="col-key">${keyHtml}</td>
        <td class="col-field">${name}</td>
        <td class="col-type">${type||''}</td>
        <td class="col-null">${nullHtml}</td>
        <td class="col-desc">${desc||''}</td>
      </tr>`;
    }).join('');
    return `<div class="tbl">
      <div class="tbl-h"><strong>${t.name}</strong><div>${t.description}</div></div>
      <table class="dd-table">
        <thead><tr>
          <th class="col-key">Key</th>
          <th class="col-field">Field</th>
          <th class="col-type">Type</th>
          <th class="col-null">Null</th>
          <th class="col-desc">Description</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }).join('');
  document.getElementById("relationshipList").innerHTML = d.relationships.map(r => `<li>${r}</li>`).join("");
  document.getElementById("apiList").innerHTML = d.apis.map(a => `<li>${a}</li>`).join("");
  document.getElementById("presentationNote").textContent = d.presentation;
}
Object.keys(model).forEach(renderTooltip);
document.querySelectorAll(".block").forEach(b=>{
  const id=b.dataset.id;
  b.addEventListener("mouseenter",()=>renderDetail(id));
  b.addEventListener("click",()=>{
    const diagram = document.getElementById("diagram");
    const openUrl = diagram ? diagram.getAttribute("data-open-url") : null;
    if(openUrl){
      window.location.href = openUrl;
      return;
    }
    renderDetail(id);
    syncBlockNav(id);
    const detailSection = document.getElementById("detailPanelAnchor");
    if(detailSection){
      scrollToTopOfDetail();
    }
  });
});
window.addEventListener('load',drawConnectors);
window.addEventListener('resize',drawConnectors);
renderDetail("order");

const diagram = document.getElementById("diagram");
if(diagram && diagram.getAttribute("data-open-url")){
  const openUrl = diagram.getAttribute("data-open-url");
  diagram.addEventListener("click", (e)=>{
    if(e.target.closest(".block")) return;
    window.location.href = openUrl;
  });
  diagram.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      window.location.href = openUrl;
    }
  });
}



function scrollToTopOfDetail(){
  const detailAnchor = document.getElementById('detailPanelAnchor');
  if(!detailAnchor) return;
  const offset = 97;
  const top = detailAnchor.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function syncBlockNav(activeId){
  document.querySelectorAll('[data-block-nav]').forEach(btn=>{
    const isActive = btn.getAttribute('data-block-nav') === activeId;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('btn-primary', isActive);
    btn.classList.toggle('btn-outline-primary', !isActive);
  });
}

document.querySelectorAll('[data-block-nav]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-block-nav');
    renderDetail(id);
    syncBlockNav(id);
    const block = document.querySelector(`.block[data-id="${id}"]`);
    if(block){
      const detailAnchor = document.getElementById('detailPanelAnchor');
    if(detailAnchor){
      scrollToTopOfDetail();
    }
    }
  });
});

syncBlockNav('order');
