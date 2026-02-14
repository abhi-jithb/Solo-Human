# Solo Human Deployment Guide

This guide explains how to deploy the **Solo Human** application to production.

## 1. Prerequisites

- **GitHub Account**: To host your code.
- **Vercel Account**: For hosting the Frontend (Next.js).
- **Render / Railway / Heroku Account**: For hosting the Backend (Node.js).
- **MongoDB Atlas Account**: For the cloud database.

---

## 2. Database Setup (MongoDB Atlas)

1.  Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new **Cluster** (Shared/Free tier is fine).
3.  Create a **Database User** (username/password).
4.  In **Network Access**, allow access from anywhere (`0.0.0.0/0`) or specific IPs.
5.  Get your **Connection String**:
    - Click **Connect** -> **Connect your application**.
    - Copy the string: `mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority`
    - Replace `<password>` with your actual password.

---

## 3. Backend Deployment (Render.com Example)

1.  Push your code to GitHub.
2.  Log in to [Render](https://render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Settings**:
    - **Root Directory**: `backend`
    - **Build Command**: `npm install`
    - **Start Command**: `node index.js`
6.  **Environment Variables**:
    - Add `MONGO_URI`: Your MongoDB connection string.
    - Add `JWT_SECRET`: A strong random string.
    - Add `PORT`: `10000` (or whatever internal port Render expects, usually variable).
7.  Deploy. apps usually get a URL like `https://solo-human-api.onrender.com`.

---

## 4. Frontend Deployment (Vercel)

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Settings**:
    - **Framework Preset**: Next.js (should auto-detect).
    - **Root Directory**: `frontend` (Click edit and select the `frontend` folder).
5.  **Environment Variables**:
    - If you used any env vars for API URL in frontend, add them here.
    - *Note*: You might need to update your frontend code to verify it points to the PROD backend URL instead of `localhost:5000`.
6.  Click **Deploy**.

---

## 5. Important Code Changes for Production

Before deploying, ensure your frontend points to the production backend URL.

**In `frontend/src/components/SignalRadar.tsx`, `Navbar.tsx`, etc:**

Change:
```javascript
const socket = io('http://localhost:5000');
axios.get('http://localhost:5000/api/...')
```

To use an environment variable:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const socket = io(API_URL);
axios.get(`${API_URL}/api/...`)
```

**Then in Vercel Env Vars:**
- `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com`

---

## 6. Verification

1.  Open your Vercel URL.
2.  Register a new user.
3.  Check if data persists in MongoDB Atlas.
4.  Test real-time features (Radar).

**Enjoy your production-ready Solo Human app!**
