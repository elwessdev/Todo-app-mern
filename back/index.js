const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require('./config/db');
const todoModel = require("./Models/todo");
require ("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/test",(req,res) => res.send("server is running"));


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
app.get("/all", async (req,res)=>{
  try{
    const AllTasks = await todoModel.find()
    if (!AllTasks) {
      return res.status(404).send({ message: 'Tasks not found' });
    }
    res.status(200).send({ tasks: AllTasks });
  } catch(err){
    console.error('Error fetching tasks:', err);
    res.status(500).send({ message: 'Server error' });
  }
  
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
