# 🏏 CricPulse

> A full-stack cricket analytics MVP.

**CricPulse** is a simple cricket analytics application that allows users to view players, teams, venues, matches, and get basic match predictions.

---

## 🛠 Tech Stack

| Layer              | Technology                                      |
|--------------------|-------------------------------------------------|
| **Frontend**       | React 19 + TypeScript + Vite + Tailwind CSS     |
| **Backend**        | NestJS                                          |
| **Analytics**      | Python + FastAPI                                |
| **Database**       | Supabase (PostgreSQL)                           |

---

## 📁 Project Structure

```
cricket-monorepo/
├── frontend/          # React 19 + Vite + TypeScript + Tailwind
├── backend/           # NestJS
├── analytics/         # FastAPI + Python
└── README.md
```

---

## ✨ Current Features

- View list of cricket players
- Search players by name
- View teams, venues, and matches
- Basic match prediction between two teams

---

## 🏗 Architecture

```
┌────────────────────┐
│   React Frontend   │
│  (localhost:5173)  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   NestJS Backend   │
│  (localhost:3000)  │
└─────────┬──────────┘
          │
     ┌────┴────┐
     ▼         ▼
┌─────────┐  ┌──────────────┐
│ Supabase│  │ FastAPI      │
│ Postgres│  │ Analytics    │
└─────────┘  └──────────────┘
```

- Frontend talks only to NestJS
- NestJS handles database access (Supabase) and calls FastAPI for predictions
- FastAPI performs basic match prediction logic

---

## 🌐 Live Demo

The application is deployed and available here:

**Frontend:** [https://cricket-monorepo.vercel.app](https://cricket-monorepo.vercel.app)

| Service     | Platform | Status |
|-------------|----------|--------|
| Frontend    | Vercel   | Live   |
| Backend     | Render   | Live   |
| Analytics   | Render   | Live   |
| Database    | Supabase | Live   |

> **Note:** Render free services may take 30–60 seconds to wake up on the first request after inactivity.

---

## ⚙️ Prerequisites

- **Node.js** ≥ 20 (tested with v24.18.0)
- **Python** ≥ 3.11 (tested with 3.14.6)
- **Git**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cricket-monorepo.git
cd cricket-monorepo
```

### 2. Environment Variables

You need `.env` files for both **backend** and **analytics**.

> **Important:** Get the `.env` files from **Amruthish**.

#### Backend (`backend/.env`)

```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANALYTICS_URL=http://localhost:8001
PORT=3000
```

#### Analytics (`analytics/.env`)

```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

### 3. Setup & Run Frontend

```bash
cd frontend
npm install
npm run dev
```

→ Runs on: [http://localhost:5173](http://localhost:5173)

---

### 4. Setup & Run Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

→ Runs on: [http://localhost:3000](http://localhost:3000)

---

### 5. Setup & Run Analytics (FastAPI)

```bash
cd analytics

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python -m uvicorn app.main:app --reload --port 8001
```

→ Runs on: [http://localhost:8001](http://localhost:8001)

---

## 🧪 How to Test

Make sure all three services are running:

| Service     | URL                          |
|-------------|------------------------------|
| Frontend    | http://localhost:5173        |
| NestJS      | http://localhost:3000        |
| FastAPI     | http://localhost:8001        |

### What you can test:

1. Open the frontend
2. View the list of players
3. Search for a player (example: `Kohli`)
4. Go to the Match Prediction section
5. Select two different teams and click **Predict Winner**

---

## 📝 Notes

- This is a low-level MVP
- Match prediction currently uses a basic win-rate model
- Data is currently seeded manually in Supabase

---

## 👤 Maintainer

- Get environment variables (`.env`) from **Amruthish**
```
