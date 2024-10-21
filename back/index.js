const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require('./config/db');
const todoModel = require("./Models/todo");
require ("dotenv").config();


const app = express();
app.use(cors({
  origin: ["https://todo-app-mern-chi.vercel.app","http://localhost:5173"],
  methods: ["*"],
}));
app.use(express.json());
connectDB();
app.use("/",(req,res) => res.send("server is running"));


// Add Task
app.post("/add",(req,res)=>{
  const task = req.body.task;
  todoModel.create({
    task: task
  })
  .then(response => res.json(response))
  .catch(err => res.json(err))
})

// get Tasks
app.get("/all",(req,res)=>{
  todoModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

// Task Done
app.put("/done/:id",(req,res)=>{
  const {id} = req.params;
  todoModel.findByIdAndUpdate({_id: id}, {isDone: true})
  .then(response => res.json(response))
  .catch(err => res.json(err))
})

// Delete Task
app.delete("/delete/:id",(req,res)=>{
  const {id} = req.params;
  todoModel.findByIdAndDelete({_id:id})
  .then(response => res.json(response))
  .catch(err=>res.json(err))
})

// Edit Task
app.put("/edit/:id",(req,res)=>{
  const {id} = req.params;
  const newContent = req.body.content;
  todoModel.findByIdAndUpdate({_id: id},{task: newContent})
  .then(response => res.json(response))
  .catch(err => res.json(err))
})

// Check SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server is running, http://localhost:${process.env.PORT}`);
})