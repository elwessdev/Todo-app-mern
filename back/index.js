const express = require("express");
const app = express();

const cors = require("cors");
const connectDB = require('./config/db');
require ("dotenv").config();

const corsOptions = {
  origin: process.env.FRONT_LINK, // Specify the exact origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/task', require('./Routes/Task'));
app.use("/",(req,res) => res.send("server is running"));

// Check SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server is running, http://localhost:${process.env.PORT}`);
})
