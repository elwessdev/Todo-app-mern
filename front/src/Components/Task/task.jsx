import "./style.scss"
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { DeleteTask, EditTask, TaskStatus } from '../../redux/TaskSlice';

const Task = ({taskInfo}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [taskContent, setTaskConten] = useState(taskInfo.task);

  const status = (id,status) => {
    dispatch(TaskStatus({
      id:id,
      status:status
    }))
    .unwrap()
    .then(res=>{ console.log("Update status: ",res); })
    .catch((error) => { console.error("Failed to update task:", error); });
    location.reload();
  }
  const deleteTask = (id) => {
    dispatch(DeleteTask(id));
    location.reload();
  }
  const editTask = (id) => {
    if(edit!=taskContent){
      console.log(id,taskContent);
      dispatch(EditTask({id: id, task: taskContent}))
      .unwrap()
      .then((response) => {
        console.log("Task successfully updated:", response);
        setEdit(false);
      })
      .catch((error) => { console.error("Failed to update task:", error);});
    }
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
        <div className="content" onClick={e=>status(taskInfo._id, !taskInfo.isDone)}>
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