# Solo Human 🚀

> **"Why should couples have all the fun?"**

Solo Human is a vibrant, high-energy social platform designed exclusively for singles who embrace the solo lifestyle. We're turning solo living into a gamified adventure, focusing on real-world connections, personal growth, and spontaneous community meetups—without the pressure of dating.

---

## 🌟 The Vision
The world is built for pairs, but the most exciting adventures are often had alone. Solo Human bridges the gap between digital gamification and real-world social interaction. Whether you're conquering a "Solo-Quest" or sending out "The Signal" for an instant coffee meetup, Solo Human is your companion for a life lived out loud.

**Tone:** Bold, Energetic, Unapologetic.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router) + Tailwind CSS + Framer Motion
- **Backend:** Express.js + Node.js
- **Database:** MongoDB (Mongoose)
- **Real-time:** Socket.io (for Map and Signals)
- **Maps:** Mapbox GL JS / Google Maps API

## 🔑 Key Features

### 1. 🌐 Geo-Location & Live Map
See other **'Solo Humans'** in your vicinity in real-time.
- **Privacy First:** Exact locations are blurred until a mutual connection or event is joined.
- **Heatmaps:** See where the action is.

### 2. ⚔️ Solo-Quests (Main Character Energy)
An RPG-style quest system that rewards you for exploring the world alone.
- **Examples:**
  - *The Silent Reader*: Read for 1hr at a café.
  - *Urban Explorer*: Visit 3 new districts.
  - *Dining Solo*: Eat at a restaurant alone (Hard Mode!).
- **Rewards:** Earn XP, badges, and unlock local perks.

### 3. 📡 The Signal
The ultimate "one-tap" button for instant connection.
- **How it works:** Tap "Broadcast Signal" -> Select Activity ("Coffee", "Movie", "Walk") -> Nearby users get a high-energy notification.
- **Goal:** Spontaneous, low-pressure hangouts. No swiping.

### 4. 🔥 Social Feed
Share your quest completions and signals. High-energy visuals, no boring status updates.

---

## 🏗️ Project Structure
```
SoloHuman/
├── backend/            # Express, MongoDB, Socket.io
│   ├── models/         # Database Schemas (User, Quest, Signal)
│   ├── routes/         # API Endpoints
│   └── index.js        # Server Entry
├── frontend/           # Next.js, Tailwind, Framer Motion
│   └── src/            # UI Components and Pages
└── README.md           # You are here
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or Local)

### 1. Clone & Setup
```bash
git clone https://github.com/abhi-jithb/Solo-Human.git
cd SoloHuman
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your MONGO_URI
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🤝 Contributing
We welcome contributions! Please open an issue or PR if you have ideas to make solo life more epic.

**License:** MIT
**Status:** Active Development 🚧
