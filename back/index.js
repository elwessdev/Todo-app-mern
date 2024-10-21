const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require('./config/db');
const todoModel = require("./Models/todo");
require ("dotenv").config();


const app = express();
connectDB();
app.use(cors());
// app.use(express.json());
app.use('/task', require('./Routes/Task'));
app.use("/",(req,res) => res.send("server is running"));

// Check SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server is running, http://localhost:${process.env.PORT}`);
})
