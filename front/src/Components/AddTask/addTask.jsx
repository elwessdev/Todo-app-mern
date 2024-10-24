import "./style.scss"
import { useState } from 'react'
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AddNewTask } from '../../redux/TaskSlice';


const AddTask = () => {
  const [task, setTask] = useState();
  // const addTask = () => {
  //   if(task){
  //     axios.post(`${import.meta.env.VITE_SERVER_URL}/add`,{task: task})
  //     .then(res => {
  //       location.reload();
  //       console.log(res);
  //     })
  //     .catch(err => {console.log(err);})
  //   }
  // }
  const dispatch = useDispatch();
  const addTask = () => {
    if(task){
      console.log("addJS",task);
      dispatch(AddNewTask(task))
      // location.reload();
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
