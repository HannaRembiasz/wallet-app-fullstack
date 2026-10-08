# 💸 Wallet App — Personal Finance Manager

A full-stack web application for managing personal finances, built with **React, Node.js, Express, and MongoDB**.

Wallet App allows users to track income and expenses, organize transactions by category, monitor their account balance, and analyze financial data through interactive charts.

The application also includes JWT-based authentication, currency exchange rates, responsive design, and a demo mode.

![Wallet App](./frontend/public/logo.svg)

---

## 🌐 Live Demo

**🚀 [Try the Live App](https://wallet-app-project.netlify.app)**

- **Frontend:** Deployed on Netlify
- **Backend:** Deployed on Vercel
- **Demo access:** Click **"Try Demo"** on the login page or use the credentials below.

```text
Email: demo@example.com
Password: password123
```

---

## ✨ Features

### Personal Finance Management

- **Transaction Management** — add, edit, and categorize income and expenses
- **Account Balance** — track the current balance
- **Interactive Charts** — visualize spending patterns with Recharts
- **Financial Statistics** — analyze monthly and yearly financial data

### Authentication & Demo Mode

- **JWT Authentication** — access and refresh token system
- **Token Blacklisting** — token revocation during logout
- **Demo Mode** — explore the application without registration

### Additional Features

- **Currency Exchange Rates** — EUR and GBP rates fetched from OpenExchangeRates
- **Responsive Design** — layouts adapted to mobile, tablet, and desktop screens

---

## 🛠️ Tech Stack

### Frontend

- **React 18+** — UI development
- **Create React App** — project tooling
- **Redux Toolkit** — state management
- **React Router** — navigation
- **Formik + Yup** — form handling and validation
- **Recharts** — data visualization
- **Axios** — API requests
- **OpenExchangeRates API** — currency exchange data
- **CSS Modules** — component styling

### Backend

- **Node.js + Express.js** — REST API
- **MongoDB + Mongoose** — database and data modeling
- **JWT** — authentication with access and refresh tokens
- **bcrypt** — password hashing
- **Swagger** — API documentation
- **Token Blacklisting** — token revocation

### Deployment

- **Netlify** — frontend
- **Vercel** — backend

---

## 📁 Project Structure

```text
WalletApp-react-node/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── ...
│   └── public/
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/HannaRembiasz/wallet-app-fullstack.git
cd wallet-app-fullstack
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CRON_SECRET=your_cron_secret
PORT=3001
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_OPEN_EXCHANGE_API_KEY=your_openexchangerates_api_key
```

**Get your OpenExchangeRates API key:**

1. Sign up at [OpenExchangeRates](https://openexchangerates.org/).
2. Obtain an API key.
3. Add the key to the frontend `.env` file.

---

## ▶️ Running the Application

Run the backend and frontend in separate terminals.

### Start the Backend Server

From the backend directory:

```bash
cd backend
npm run dev
```

The backend runs at `http://localhost:3001`.

### Start the Frontend Development Server

From the frontend directory:

```bash
cd frontend
npm start
```

The frontend runs at `http://localhost:3000`.

---

## 📚 API Documentation

The backend API is documented using **Swagger**.

- **[Online API Documentation](https://wallet-app-fullstack.vercel.app/api-docs/)**
- **Local API Documentation:** `http://localhost:3001/api-docs`

The local documentation is available when the backend server is running.

---

## 🔐 Authentication

The application uses JWT-based authentication with access and refresh tokens.

- **Access tokens** — used to authenticate API requests
- **Refresh tokens** — allow users to obtain a new access token without logging in again
- **Token validation** — refresh tokens are checked against the stored user token and blacklist
- **Token blacklisting** — access and refresh tokens are revoked during logout

---

## 🎨 Demo Mode

You can explore Wallet App without creating a new account.

Click **"Try Demo"** on the login page or use:

```text
Email: demo@example.com
Password: password123
```

Demo transactions are generated through the backend seed mechanism.

---

## 📱 Responsive Design

The application supports mobile, tablet, and desktop screen sizes.

| Device | Breakpoint |
| --- | --- |
| Mobile | Below 768px |
| Tablet | 768px–1279px |
| Desktop | 1280px and above |

---

## 🚀 Deployment

### Live Deployment

- **Frontend:** [View Live App](https://wallet-app-project.netlify.app)
- **Backend API:** [View Backend API](https://wallet-app-fullstack.vercel.app/)
- **API Documentation:** [View Swagger Docs](https://wallet-app-fullstack.vercel.app/api-docs/)

### Deploy Your Own Instance

#### Backend — Vercel

From the backend directory:

```bash
cd backend
vercel login
vercel
vercel --prod
```

Set the following environment variables in Vercel:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CRON_SECRET=your_cron_secret
SWAGGER_SERVER_URL=https://your-vercel-app-name.vercel.app
```

#### Frontend — Netlify

Build the frontend:

```bash
cd frontend
npm install
npm run build
```

Deploy the `build` folder using [Netlify Drop](https://app.netlify.com/drop), or connect your GitHub repository for automatic deployments.

Set the following environment variables in Netlify:

```env
REACT_APP_API_URL=https://your-vercel-app-name.vercel.app
REACT_APP_OPEN_EXCHANGE_API_KEY=your_api_key
```

---

## 🧪 Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm start` | Start the production server |
| `npm run dev` | Start the development server with nodemon |

### Frontend

| Command | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Build for production |

---

## 👩‍💻 Author

- **[LinkedIn Profile](https://www.linkedin.com/in/hanna-rembiasz/)**
- **[GitHub Repository](https://github.com/HannaRembiasz/wallet-app-fullstack)**
