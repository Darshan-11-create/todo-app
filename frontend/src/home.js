import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './home.css';

export function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date().toISOString('sv-SE').slice(0, 16));
  const [gapForNoti, setGapForNoti] = useState("");
  const [whenToStart, setWhenTOStart] = useState(new Date().toISOString('sv-SE').slice(0, 16));
  const navigate = useNavigate();

  async function taskHandler(e) {
    e.preventDefault();
    const Task = {
      taskName,
      dateOfTask: date,
      gapForNotifications: gapForNoti,
      whenToStartNotifications: whenToStart,
      customer: { id: Number(localStorage.getItem("id")) }
    };
    try {
      await fetch(`https://todo-backend-l770.onrender.com/addTask`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(Task)
      });
      navigate("/home");
    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  }

  return (
    <div className="page-wrapper">
      <h1>Add a Task</h1>
      <form className="form-meta" onSubmit={taskHandler}>
        <label className="form-label">Task Name</label>
        <input type="text" placeholder="Enter task name" className="form-inputs"
          value={taskName} onChange={(e) => setTaskName(e.target.value)} />

        <label className="form-label">Date of Work</label>
        <input type="datetime-local" className="form-inputs"
          value={date} onChange={(e) => setDate(e.target.value)} />

        <label className="form-label">Gap For Notifications</label>
        <input type="number" className="form-inputs" placeholder="Enter Gap For Notifications in Minutes"
          value={gapForNoti} onChange={(e) => setGapForNoti(e.target.value)} />

        <label className="form-label">When To Start Notifications</label>
        <input type="datetime-local" className="form-inputs"
          value={whenToStart} onChange={(e) => setWhenTOStart(e.target.value)} />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

function Home() {
  const [TaskList, setTaskList] = useState([]);

  async function taskFetcher() {
    try {
      const res = await fetch(`https://todo-backend-l770.onrender.com/allTasks?id=${localStorage.getItem("id")}`);
      if (res.ok)
      {
        const today=new Date();
        const data=await res.json();
        // setTaskList(await res.json());
        const sorted=data.sort((a,b)=>{
            const dateA=new Date(a.dateOfTask);
            const dateB=new Date(b.dateOfTask);
            const isPastA=dateA<today;
            const isPastB=dateB<today;
            if(isPastA!==isPastB)
               return isPastA?1:-1
            return dateA-dateB
        })
        setTaskList(sorted)
    }
    else{
      alert("Wait We are Fetching")
    }
  }
  catch(err){
    console.log(err);
  }
}
  async function taskremover(id) {
    try {
      await fetch(`https://todo-backend-l770.onrender.com/removeTask?task_id=${id}`, { method: "DELETE" });
      taskFetcher();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => { taskFetcher(); }, []);

  return (
    <div className="page-wrapper">
      <div className="page-topbar">
        <h1>Your Tasks</h1>
        <ul className="HomePage-Task-adder">
          <li>
            <Link to="/addTask">Add Task</Link>
          </li>
        </ul>
      </div>

      <ul className="task-list">
        {TaskList.length === 0
          ? <p className="no-task">No tasks yet — add one above.</p>
          : TaskList.map((task) => (
            <li key={task.task_id} className="tasklist">
              <span className="task-name">{task.taskName}</span>
              <span className="task-date">{task.dateOfTask}</span>
              <button onClick={() => taskremover(task.task_id)}>Remove</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Home;
