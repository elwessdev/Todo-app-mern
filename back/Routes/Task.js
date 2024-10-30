const express = require('express');
const router = express.Router();
const todoModel = require("../Models/todo");

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

// Add Task
router.post("/add",async (req, res)=>{
  const task = req.body.newT;
  try{
    todoModel.create({task: task})
    res.status(200).send("Task has Added");
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
router.put("/edit/:id", async(req, res)=>{
  console.log(req.params.id, req.body.content);
  try{
    const change = await todoModel.findByIdAndUpdate(
      { _id: req.params.id },
      { task: req.body.content }
    );
    res.status(200).send({ change });
  } catch(err){
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
});

// Task status
router.put("/status/:id",async (req, res)=>{
  try{
    const change = await todoModel.findByIdAndUpdate(
      {_id: req.params.id},
      {isDone: req.body.status}
    )
    res.status(200).send({ change });
  } catch(err){
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
})

module.exports = router;