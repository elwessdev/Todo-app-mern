const express = require('express');
const router = express.Router();
const todoModel = require("../Models/todo");

// Add Task
router.post("/add",async (req, res)=>{
  const task = req.body.task;
  try{
    const change = todoModel.create({task: task})
    res.status(200).send({ change });
  } catch(err){
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
})

// get Tasks
router.get("/all", async (req,res)=>{
  try{
    const AllTasks = await todoModel.find()
    if (!AllTasks) {
      return res.status(404).send({ message: 'Tasks not found' });
    }
    res.status(200).send({ tasks: AllTasks });
  } catch(err){
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
})

// Task Done
router.put("/done/:id",async (req, res)=>{
  const {id} = req.params;
  try{
    const change = await todoModel.findByIdAndUpdate({_id: id}, {isDone: true})
    res.status(200).send({ change });
  } catch(err){
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
})

// Delete Task
router.delete("/delete/:id",async (req, res)=>{
  const {id} = req.params;
  try{
    const change = await todoModel.findByIdAndDelete({_id:id})
    res.status(200).send({ change });
  } catch(err){
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
})

// Edit Task
router.put("/edit/:id",async (req, res)=>{
  const {id} = req.params;
  try{
    const newContent = req.body.content;
    const change = todoModel.findByIdAndUpdate({_id: id},{task: newContent})
    res.status(200).send({ change });
  } catch(err){
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
});


module.exports = router;