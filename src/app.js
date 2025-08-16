require('dotenv').config()
const express = require('express');
const authRoutes = require('../src/routes/auth.routes');
const LostRoutes = require('../src/routes/Lost.routes');
const FoundRoutes = require('../src/routes/Found.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/lost_items', LostRoutes);
app.use('/api/found_items', FoundRoutes);

module.exports = app;