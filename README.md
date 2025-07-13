# DoughFlowClient

React-based frontend application for managing personal and business finances in an intuitive and visual way.

---

## 🧠 Technologies Used

- React.js  
- Material-UI (MUI)  
- Axios  
- React Router DOM  
- Chart.js  
- JavaScript (ES6+)  
- CSS Modules  

---

## ✨ Main Features

- 🔐 User authentication (signup/login)  
- 💳 Add, edit, and delete income & expense records  
- 📊 Monthly and yearly financial overviews with graphs  
- 📁 Categorized views for personal/business expenses  
- 🌙 Light/Dark mode support  
- 📱 Responsive design for all devices  

---

## 📦 Installation & Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/galtes1/DoughFlowClient.git
cd DoughFlowClient
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npm start
```

The app will run at: `http://localhost:3000/`

---

## 🔗 API Integration

This client communicates with the backend server (**DoughFlowServer**) through RESTful APIs.  
Make sure the backend is running at: `http://localhost:5000/`  
If needed, update the base URL in the API service files located in:  
`src/PieChart/Services/` and `src/Users/Services/`

---

## 📁 Project Structure (Overview)

```
src/
│
├── Component/            # Shared components
├── Forms/                # Forms for income/expense input
├── Layout/               # Header, Footer, Main layout
├── PieChart/             # Charts, summaries, graphs
├── Routes/               # React Router setup
├── Users/                # Login, signup, profile logic
├── Providers/            # Theme and context providers
├── Styles/               # CSS and theme files
└── App.js                # App entry point
```

---

## 🛠️ Environment Setup

To connect to your own backend:  
1. Open the file: `src/Users/Services/uesersApiService.js`  
2. Replace the `apiurl` with your backend address if not running on `localhost:5000`

---

## 📜 License

This project is for academic/demo purposes and not licensed for commercial use.

---

**Created and developed by Gal Testa, Israel 2025**