import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';

import connectToDb from "./src/db/db.js";
import authRoutes from './src/routes/auth.routes.js';
import './src/middleware/passport.js'; // This executes the passport configuration
import lostRoutes from "./src/routes/Lost.routes.js"
import foundRoutes from "./src/routes/Found.routes.js"
// Connect to the database
connectToDb();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---

// 1. CORS: Allows your frontend (running on localhost:5173) to make requests to the backend
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true // Important for sending cookies
}));

// 2. Body Parsers: To handle JSON data and cookies
app.use(express.json());
app.use(cookieParser());

// 3. Session and Passport for Google OAuth
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;