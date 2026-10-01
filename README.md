# MERN Stack Application

A full-stack application boilerplate built with the **MERN** stack (**M**ongoDB, **E**xpress, **R**eact, **N**ode.js), organized into a clean `client/` and `server/` structure.

---

## 📁 Project Structure

```text
Team13_ServiceNow/
├── client/                     # Frontend (React + Vite)
│   ├── public/                 # Static assets (favicons, icons)
│   ├── src/
│   │   ├── assets/             # Images, fonts, SVG icons
│   │   ├── components/         # Reusable UI components (Navbar, Button, Card, etc.)
│   │   ├── context/            # Global state / React Context providers
│   │   ├── hooks/              # Custom React hooks (e.g., useAuth, useFetch)
│   │   ├── pages/              # Route views / page components (Home, Login, Dashboard)
│   │   ├── services/           # API request helpers (Axios/fetch client)
│   │   ├── utils/              # Helper functions & formatters
│   │   ├── App.css             # Main layout styles
│   │   ├── App.jsx             # Root React component
│   │   ├── index.css           # Global typography & reset CSS
│   │   └── main.jsx            # React DOM mounting entrypoint
│   ├── .env.example            # Sample frontend environment variables
│   ├── index.html              # HTML entry template
│   ├── package.json            # Frontend dependencies and scripts
│   └── vite.config.js          # Vite config & proxy rules for backend API
│
├── server/                     # Backend (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # Configuration modules (database connection, etc.)
│   │   ├── controllers/        # Request handlers & HTTP responses
│   │   ├── middleware/         # Custom Express middleware (auth, error handler)
│   │   ├── models/             # Mongoose schemas & data models
│   │   ├── routes/             # Express API route endpoints
│   │   ├── services/           # Reusable business logic / external APIs
│   │   ├── utils/              # Helper utilities
│   │   ├── app.js              # Express app initialization & middleware configuration
│   │   └── server.js           # Server entrypoint & DB connection listener
│   ├── .env.example            # Sample backend environment variables
│   └── package.json            # Backend dependencies and scripts
│
├── .gitignore                  # Git ignore rules for node_modules, build outputs, and env files
├── package.json                # Root package for workspace scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection string

### 2. Environment Setup

Copy `.env.example` to `.env` in both `server` and `client`:

```bash
# Backend environment setup
cp server/.env.example server/.env

# Frontend environment setup
cp client/.env.example client/.env
```

Update `server/.env` with your MongoDB connection string:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/mern_db
```

### 3. Installation

You can install dependencies for both client and server from the root directory:

```bash
# Install root, client, and server dependencies
npm install
npm install --workspace=server
npm install --workspace=client
```

Or install within each directory individually:
```bash
cd server && npm install
cd ../client && npm install
```

### 4. Running Development Servers

From the root directory:
```bash
# Run both client and server simultaneously
npm run dev

# Or run separately:
npm run dev:server    # Starts backend on http://localhost:5000
npm run dev:client    # Starts frontend on http://localhost:5173
```
