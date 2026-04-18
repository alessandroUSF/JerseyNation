# Jersey Nation

Jersey Nation is a full-stack e-commerce simulation platform focused on selling national team soccer jerseys for the 2026 World Cup.

The project combines e-commerce design, data visualization, user behavior tracking, AI chatbot integration, and interactive data modeling to replicate a real-world digital commerce environment.

Originally developed using ASP.NET Core Razor Pages (C#), the project was later converted into a fully static website while preserving structure, functionality, and design quality.

---

## 🎯 Project Purpose

This application was designed to demonstrate how modern digital commerce platforms integrate:

- Product experience  
- Data analytics  
- User behavior tracking  
- Scalable data architecture  
- Interactive documentation (ERD + Data Dictionary)  
- AI-powered user interaction  

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
  - Dynamic filters (daily, weekly, monthly)  
  - Hover tooltips and responsive updates  
- Improved scaling, responsiveness, and dataset handling  

---

### 🤖 AI Chatbots (Botpress Integration)

Two chatbots were developed with distinct roles:

**Pelé – Customer Assistant**
- Helps users find products  
- Provides recommendations based on teams and preferences  
- Explains product details  

**Maradona – Admin & Data Assistant**
- Explains system structure and pages  
- Interprets data and KPIs  
- Supports administrative and analytical tasks  

Both chatbots are integrated into multiple pages, enhancing usability and interactivity.

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

- Responsive design  
- Custom dark theme (charcoal + green palette)  
- Interactive UI components  
- Consistent navigation across pages  

The dark theme was intentionally chosen to create strong contrast and highlight the jerseys as the main visual element.

---

## 🛠️ Tech Stack

- ASP.NET Core Razor Pages  
- C#  
- HTML / CSS / JavaScript  
- Chart.js  
- Botpress  
- AI Tools (for images and development support)  

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
- Integrates AI chatbots for user and admin interaction  
- Successfully converts a dynamic Razor application into a static website  

---

## 📌 Version

Current Version: 2.0.0  

---

## 📜 Changelog

### 🔄 v2.0.0 (Final Version)
- Added AI Chatbots (Pelé and Maradona) with Botpress  
- Integrated chatbots across multiple pages  
- Converted full project from Razor Pages to static website  
- Improved Data Visualization (filters, scaling, datasets)  
- Fixed chart behavior and rendering issues  
- Standardized UI and CSS structure  
- Created bots.css for modular styling  
- Improved responsiveness and layout consistency  
- Added API details page  
- General UI/UX refinements  

---

### 🔄 v1.1.0
- Added API page  
- Implemented Data Dictionary  
- Built dynamic ERD  
- Added CRUD Navigation  
- Implemented search  
- Added Next Matches feature  
- Implemented behavior tracking  
- Improved charts  

---

### 🟢 v1.0.0
- Core e-commerce structure  
- Product pages  
- Initial charts  
- Initial ERD  

---

## 🚧 Roadmap

- API integration with live data  
- Persistent cart and checkout  
- Payment gateway integration  
- Personalized recommendations  
- Real-time analytics  

---

## 👨‍💻 Author

Alessandro Luiz Sica de Almeida  
University of South Florida  
Master’s in AI & Business Analytics