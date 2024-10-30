import { useEffect, useState } from 'react'
import "./main.scss"
import Task from "./Components/Task/task"
import AddTask from "./Components/AddTask/addTask"
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllTask } from './redux/TaskSlice';

export default function App() {
  const dispatch = useDispatch();
  const Tks = useSelector((state) => state.tasks.tasks);
  const GetAllTask_Dis = () => {
    dispatch(GetAllTask());
  }
  useEffect(()=>{
    GetAllTask_Dis();
  },[]);
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <AddTask />
      {Tks ? (
            <ul className="task-list">
                {Tks.map((task) => <Task key={task._id} taskInfo={task} />)}
            </ul>
        ) : (
            <div className='nothing'><p>Nothing yet</p></div>
        )}
    </div>
  )
}