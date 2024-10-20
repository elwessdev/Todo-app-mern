import { useEffect, useState } from 'react'
import "./main.scss"
import Task from "./Components/Task/task"
import AddTask from "./Components/AddTask/addTask"
import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const getTasks = () => {
    axios.get(`${url}/task/all`)
    .then(res => {
      setTasks(res.data.tasks);
      // console.log(res.data.tasks);
    })
    .catch(err => {console.log(err);})
  }
  useEffect(()=>{
    getTasks();
  },[])
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <AddTask />
      { tasks.length
        ?
        <ul className="task-list">
          {tasks.map(task=><Task key={task._id} taskInfo={task}/>)}
        </ul>
        :
        <div className='nothing'><p>Nothing yet</p></div>
      }
    </div>
  )
}