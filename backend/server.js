const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDb = require("./src/db/db");
require("dotenv").config();

const app = express();
connectToDb();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Lost & Found API running...");
});

app.listen(3000, ()=>{
  console.log('Server running at 3000');
})