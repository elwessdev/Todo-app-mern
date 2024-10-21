import { useEffect, useState } from 'react'
import "./main.scss"
import Task from "./Components/Task/task"
import AddTask from "./Components/AddTask/addTask"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

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
  },[]);

  //dispatch for "dispatch" async functions from TaskSlice
  const dispatch = useDispatch();
  const Tasks = useSelector((state) => state.tasks.tasks); //Select tasks from initialState from TaskSlice //state.tasks (check store.ts)

  const GetAllTask = () => {
    dispatch(GetAllTask());
  }
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <AddTask />
      { Tasks.length
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