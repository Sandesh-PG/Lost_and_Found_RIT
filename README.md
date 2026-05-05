# Lost and Found Portal

A full-stack Lost & Found web application — React frontend with a Node/Express + MongoDB backend. Users can sign up / sign in, report lost or found items, browse and search listings, view item details, and receive notifications.

## Tech stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Auth & Notifications: Google OAuth, JWT, email-based password reset (configurable)

## Project structure

- `backend/` — Express server, API routes, controllers, and Mongoose models
- `frontend/` — React app, pages, components, and auth context

## Prerequisites

- Node.js (>=16)
- npm or yarn
- MongoDB (local or Atlas)

## Environment variables

Create a `.env` in `backend/` with at least:

- `PORT` (optional, default 5000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `SESSION_SECRET` — session secret (if using sessions)
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` — for email notifications (optional)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — for Google OAuth (optional)
- `FRONTEND_URL` — frontend base URL (used in some email links)

## Run locally

From the repo root, start backend and frontend in separate terminals.

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs by default on `http://localhost:5173` and the backend on `http://localhost:5000`.
