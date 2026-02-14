# Solo Human - Technical Documentation

## 🏗️ Architecture Overview

**Solo Human** is a full-stack web application built to gamify the solo lifestyle. It uses a **Client-Server** architecture with real-time capabilities.

### 🥞 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 16** (App Router) | React Framework for SSR & Routing |
| | **Tailwind CSS v4** | Utility-first styling with CSS variables |
| | **Framer Motion** | Complex UI animations & transitions |
| | **Lucide React** | Consistent icon set |
| **Backend** | **Node.js + Express** | REST API & Validations |
| | **Socket.io** | Real-time bi-directional communication (Radar) |
| | **Bcrypt.js & JWT** | Security (Hashing passwords & Session tokens) |
| **Database** | **MongoDB** (Mongoose) | NoSQL DB for Users, Quests, Signals |

---

## 🔑 Environment Variables

The backend requires a `.env` file in the `/backend` directory:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/solohuman
JWT_SECRET=your_jwt_secret_here  # ⚠️ CHANGE THIS IN PRODUCTION
```

The frontend uses standard Next.js environment handling (currently none required for MVP).

---

## 🧩 Key Features & Implementation Details

### 1. Authentication (JWT)
- **Flow**: User registers -> Server hashes password -> Returns JWT.
- **Client**: Stores JWT in `localStorage`.
- **Protection**: Frontend redirects to `/login` if no token is found on protected pages (`/dashboard`, `/profile`).

### 2. Live Radar (Socket.io)
- **Concept**: Users "broadcast" a signal.
- **Flow**: 
  1. User selects activity (e.g., "Coffee").
  2. Client emits `send-signal` event via Socket.io.
  3. Server broadcasts `signal-received` to all other connected clients.
  4. Other clients' radars update instantly to show the new blip.

### 3. Quest System
- **Database**: Quests are stored in MongoDB with `xpReward`, `difficulty`, and `category`.
- **Seeding**: A `seed.js` script populates initial quests.
- **UI**: Quests are fetched via API (`GET /api/quests`) and displayed as interactive cards.

### 4. UI/UX (Neon Aesthetics)
- **Design System**: Dark mode by default (`#0a0a0a`) with neon accents (`Purple`, `Pink`, `Yellow`).
- **Glassmorphism**: Panels use semi-transparent backgrounds with blur filters (`backdrop-filter: blur(10px)`).

---

## 🚀 Future Roadmap

1.  **Geolocation**: Integrate `navigator.geolocation` to filter signals by 5km radius.
2.  **Interactive Map**: Enhance map with OpenStreetMap + Leaflet (Current Implementation).
3.  **Chat**: Add private messaging between matched users.
4.  **Image Uploads**: Allow users to upload photos for quest proof (e.g., using AWS S3 or Cloudinary).
