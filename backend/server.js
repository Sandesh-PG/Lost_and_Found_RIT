import 'dotenv/config';
import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
// import lostRoutes from './src/routes/Lost.routes.js';
// import foundRoutes from './src/routes/Found.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDb from "./src/db/db.js"

connectToDb();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;