# JerseyNation Manual

## Project Overview
JerseyNation is a prototype e-commerce website focused on national team jerseys related to the 2026 World Cup. The project combines storefront presentation, product organization, and personalized recommendation logic.

## Pages Implemented
- Home
- Shop
- About
- Privacy
- All Jerseys
- Product Details
- Cart

## Shop Page
The Shop page currently includes:
- Hero section
- Top Picks section
- Promotions section
- For You personalized recommendations
- Special Jerseys section
- Matchday recommendation section
- Team flag navigation

## Product Data
The project currently uses mock product data stored in `Data/JerseyStore.cs`.

Each jersey currently includes:
- Team
- Jersey type
- Audience
- Color
- Cost price
- Sale price
- Promotional price
- Jersey number
- Goalkeeper indicator
- Special item flags
- Available sizes
- Unavailable sizes
- Product images

These fields are intentionally limited to support simulation and front-end testing in the current prototype. In a real e-commerce application, the product catalog would be supported by a database with many additional attributes and operational records.

A production-level jersey store would likely include:
- supplier and manufacturer information
- SKU and internal product codes
- brand and collection
- material and fabric details
- product weight and dimensions
- country of origin
- stock availability by size and variation
- warehouse location
- inventory control and restocking data
- purchase orders and supplier lead times
- shipping and delivery information
- order history
- return and exchange eligibility
- customer reviews and ratings
- discount rules and promotional history
- product status, such as active, inactive or sold out

## Personalized Recommendations
The "For You" section uses JavaScript and `localStorage` to simulate personalized recommendations.

Current recommendation signals include:
- searched teams
- clicked teams
- preferred audience
- preferred jersey type
- preferred sizes
- interest in special items
- interest in goalkeeper jerseys
- browser language

The recommendation logic is implemented in `wwwroot/js/site.js`.

## Images and Flags
- Product images are stored in `wwwroot/images/jerseys`
- Flags are stored in `wwwroot/images/flags`
- Banner and background images are stored in `wwwroot/images`

## How to Update Products
To add a new product:
1. Open `Data/JerseyStore.cs`
2. Add a new `JerseyItem`
3. Add the related image files to `wwwroot/images/jerseys`
4. Verify that the product appears correctly in the Shop sections

## Current Limitations
- The Product Details page is still a simplified placeholder
- The Cart page is still a simplified placeholder
- The All Jerseys page is still a simplified placeholder
- Recommendation logic is currently local and browser-based only
- No database integration is implemented yet
- Checkout and payment flow are not implemented yet

## Future Improvements
- Full product details and customization flow
- Add to cart with selected size and number
- Database integration
- Checkout flow
- Payment integration
- AI-based try-on simulation
- Supplier and delivery API integration
- Marketing analytics and cookie-based personalization
- Expanded recommendation logic


This simplified structure was designed to support the current academic prototype, while leaving room for future migration to a more complete database-driven e-commerce architecture.