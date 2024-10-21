import "./style.scss"
import { useState } from 'react'
import axios from 'axios';


const AddTask = () => {
  const [task, setTask] = useState();
  const addTask = () => {
    if(task){
      axios.post(`${import.meta.env.VITE_SERVER_URL}/add`,{task: task})
      .then(res => {
        location.reload();
        console.log(res);
      })
      .catch(err => {console.log(err);})
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
