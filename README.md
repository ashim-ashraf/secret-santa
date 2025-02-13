# Secret Santa App  

## Overview  
This is a full-stack Secret Santa application that allows users to upload employee lists, process Secret Santa assignments, and download the assignments as a CSV file. It consists of a **React frontend** and a **Node.js backend**.  

---

## Folder Structure  
```
SECRET-SANTA/
│-- client/       # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── App.tsx          # Root React component
│   │   ├── main.tsx         # Application entry point
│-- server/       # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── docs/            # API documentation
│   │   ├── helpers/         # Utility functions
│   │   ├── middlewares/     # Express middlewares
│   │   ├── routes/          # API routes
│   │   ├── tests/           # Unit & integration tests
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # General utilities
│   │   ├── app.ts           # Express app setup
│   │   ├── server.ts        # Server entry point
│-- .env          # Environment variables
│-- package.json  # Dependencies and scripts
│-- README.md     # Project documentation
```  

---

## Client Setup (React)  

### Prerequisites  
- Node.js (LTS version recommended)  
- npm or yarn  

### Installation  
```sh
cd client
npm install  # or yarn install
```  

### Running the Client  
```sh
npm run dev  # or yarn dev
```  
The frontend runs on `http://localhost:5173` by default.  

---

## Server Setup (Node.js + Express)  

### Prerequisites  
- Node.js (LTS version recommended)  
- MongoDB (if applicable)  

### Installation  
```sh
cd server
npm install  # or yarn install
```  

### Environment Variables  
Create a `.env` file inside the `server` directory with the following:  
```
PORT=5000
NODE_ENV=development
```
Modify it based on your needs.  

### Running the Server  
```sh
npm run dev  # or yarn dev
```  
The backend runs on `http://localhost:5000` by default.  

---

## API Endpoints  

### POST `/api/v1/generate-secret-child`  
- **Description:** Uploads employee lists and assigns Secret Santa pairs.  
- **Request:** `multipart/form-data` with `employeeList` and optional `previousYearList`.  
- **Response:** CSV file with assignments.  

---
## CSV File Formats
### Employee List CSV Format
This file should contain a list of employees participating in Secret Santa.
```
Employee_Name,Employee_EmailID
Alice,alice@example.com
Bob,bob@example.com
Charlie,charlie@example.com
...
```

### Previous Assignments CSV Format
This file should contain past Secret Santa assignments (optional but recommended to prevent repeat assignments).
```
Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
Alice,alice@example.com,Bob,bob@example.com
Bob,bob@example.com,Charlie,charlie@example.com
Charlie,charlie@example.com,Alice,alice@example.com
...
```

---

## 🎯 Workflow & Business Logic  

### **How the App Works**  
1. **User Uploads Employee List**  
   - The user selects a **CSV file** containing employee details (Name, Email).  
   - Optionally, the user can upload the **previous year's assignments** to prevent duplicate pairings.  

2. **Processing the Assignments**  
   - The backend reads the employee list and shuffles it.  
   - It assigns a **Secret Santa** to each employee while ensuring:  
     - An employee is not assigned to themselves.  
     - If a previous year’s list exists, the same pair is **not repeated**.  
     - The algorithm tries to ensure a fair random distribution.  

3. **Displaying & Downloading Results**  
   - The assignments are displayed in a table format on the frontend.  
   - Users can **download the assignments** as a CSV file.  

### **Conditions & Constraints**  
✔ Employees cannot be assigned themselves as their Secret Santa.  
✔ If a previous year’s list is provided, the same pairs cannot be repeated.  
✔ The algorithm ensures a random and fair distribution.  
✔ The application supports **CSV uploads only** (no manual input).  

---

## Testing  

### Server Tests  
```sh
cd server
npm test  # or yarn test
```  

---

## Deployment  

### Client  
Build the client for production:  
```sh
npm run build  # or yarn build
```  

### Server  
Run the server in production:  
```sh
npm start  # or yarn start
```  

---