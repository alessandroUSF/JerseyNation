# Jersey Nation

Jersey Nation is a full-stack e-commerce simulation platform focused on selling national team soccer jerseys for the 2026 World Cup.

The project combines e-commerce design, data visualization, user behavior tracking, and interactive data modeling to replicate a real-world digital commerce environment.

---

## 🎯 Project Purpose

This application was designed to demonstrate how modern digital commerce platforms integrate:

- Product experience  
- Data analytics  
- User behavior tracking  
- Scalable data architecture  
- Interactive documentation (ERD + Data Dictionary)  

It reflects both technical implementation and business-oriented thinking.

---

## 🚀 Core Features

### 🛍️ E-commerce Experience
- Product catalog with structured attributes  
- Promotional pricing with discount visualization  
- Product detail page (size and quantity selection)  
- UI-ready cart system  

---

### 🔍 Search & Navigation
- Product search functionality  
- Category-based browsing  
- Dedicated CRUD Navigation for entity management  

---

### 📊 Data Visualization
- Interactive charts using Chart.js:
  - Sales & revenue over time  
  - Team performance  
  - Sales distribution  
- Fully interactive elements:
  - Clickable flags  
  - Clickable labels  
- Improved scaling and responsiveness  

---

### ⚽ Match-Based Shopping
- Next Matches feature  
- Suggests jerseys based on upcoming games  
- Direct navigation to team products  

---

### 🧠 Behavioral Tracking (Cookies)
- Tracks:
  - Click events  
  - Navigation patterns  
  - Product interest  
- Foundation for recommendation systems and personalization  

---

### 🔌 API Layer
- Dedicated API page  
- Structured endpoints for future integrations  
- Supports scalability and interoperability  

---

### 📘 Data Dictionary
- Centralized documentation of all entities and attributes  
- Connected with ERD for seamless navigation  

---

### 🧱 Interactive ERD (Key Differentiator)

The ERD is not static — it is designed as an interactive exploration tool:

- Organized by functional groups  
- Mouseover shows summary of each block  
- Click opens detailed structure in Data Dictionary  

This improves usability, documentation clarity, and scalability.

---

## 🏗️ Data Architecture

Includes a structured relational model with:

- Products  
- Customers  
- Orders  
- Payments  
- Promotions  
- Coupons  
- CouponRedemption  
- Suppliers  
- Refunds  

Additional design features:

- Order snapshot stored as JSON for consistency  
- Modular structure for real-world scalability  

---

## 🎨 User Experience

- Responsive design (Bootstrap)  
- Custom dark theme (charcoal + green palette)  
- Interactive UI components  
- Consistent navigation across pages  

---

## 🛠️ Tech Stack

- ASP.NET Core Razor Pages  
- C#  
- HTML / CSS / JavaScript  
- Bootstrap  
- Chart.js  

---

## 📁 Project Structure

- /Pages → UI (Razor Pages)  
- /Models → Data models  
- /wwwroot → Static assets  
- /DataVisualization → Charts logic  
- /images/flags → Visual assets  

---

## 🔧 Run Locally

Run the application:

dotnet run --launch-profile https

Then open in your browser:

https://localhost:7052

---

## 📊 Project Highlights

- Combines business and technical architecture  
- Demonstrates end-to-end thinking (UX, data, and backend structure)  
- Implements interactive documentation (ERD and Data Dictionary)  
- Introduces behavioral tracking for personalization  
- Simulates real e-commerce decision flows  

---

## 📌 Version

Current Version: 1.1.0  

---

## 📜 Changelog

### 🔄 v1.1.0 (Latest)
- Added API page for structured data access  
- Implemented Data Dictionary  
- Built dynamic ERD with interactive JavaScript behavior  
- Added CRUD Navigation section  
- Implemented product search  
- Added Next Matches feature  
- Implemented cookie-based behavior tracking  
- Improved chart interactivity (flags and labels clickable)  
- Fixed chart scaling issues  
- Added currency formatting with thousand separators  
- General UI and UX refinements  

---

### 🟢 v1.0.0 (Initial Release)
- Core e-commerce structure implemented  
- Product catalog and product detail pages  
- Initial chart implementation  
- Basic ERD structure  
- Initial UI and layout  
- Navigation framework  

---

## 🚧 Roadmap

- Chatbot integration (customer support and recommendations)  
- Persistent cart and checkout flow  
- Payment gateway integration  
- Personalized recommendations based on behavior tracking  
- Real-time data integration  

---

## 👨‍💻 Author

Alessandro Almeida  
alessandroalmeida@usf.edu
University of South Florida  
Master’s in AI & Business Analytics