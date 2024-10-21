import axios from "axios";
import "./style.scss"
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { useState } from "react";
const url = import.meta.env.VITE_SERVER_URL;

const Task = ({taskInfo}) => {
  const [edit, setEdit] = useState(false)
  const [taskContent, setTaskConten] = useState(taskInfo.task)
  const isDone = (id) => {
    axios.put(`${url}/done/${id}`)
    .then(res => {
      location.reload();
      console.log(res);
    })
    .catch(err => {console.log(err);})
  }
  const deleteTask = (id) => {
    axios.delete(`${url}/delete/${id}`)
    .then(res=>{
      location.reload();
      console.log(res);
    })
    .catch(err=>{console.log(err);})
  }
  const editTask = (id) => {
    if(taskContent!=taskInfo.task){
      axios.put(`${url}/edit/${id}`,{content: taskContent})
      .then(response => {
        // location.reload();
        console.log(response);
      })
      .catch(err => {console.log(err);})
    }
    setEdit(false)
  }
  return (
    <li>
      {edit
        ?
        <div className="edit">
          <input value={taskContent} onChange={e=>setTaskConten(e.target.value)} />
          <button onClick={e=>editTask(taskInfo._id)}>save</button>
        </div>
        :
        <div className="content" onClick={e=>isDone(taskInfo._id)}>
          {taskInfo.isDone ?<AiFillCheckCircle /> :<BsCircleFill />}
          <span className={taskInfo.isDone ?'completed' :''} >{taskContent}</span>
      </div>
      }
      <div className="btns">
        <button onClick={e=>setEdit(true)}>Edit</button>
        <button onClick={e=>deleteTask(taskInfo._id)}>Delete</button>
      </div>
    </li>
  )
}
export default Task;