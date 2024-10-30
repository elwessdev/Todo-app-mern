import "./style.scss"
import { useState } from 'react'
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AddNewTask } from '../../redux/TaskSlice';


const AddTask = () => {
  const [task, setTask] = useState();
  const dispatch = useDispatch();
  const addTask = () => {
    if(task){
      console.log("add front: ",task);
      dispatch(AddNewTask(task))
      location.reload();
    }
  }

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Add a new task..."
        onChange={e=>setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  )
}

export default AddTask;
