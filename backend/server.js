import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import connectToDb from "./src/db/db.js"
import authRoutes from './src/routes/auth.routes.js';
import session from 'express-session';
import passport from 'passport';
import './src/middleware/passport.js';

connectToDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;