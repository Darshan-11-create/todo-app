import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './home.css';

export function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date().toISOString('sv-SE').slice(0, 16));
  const [gapForNoti, setGapForNoti] = useState("");
  const [whenToStart, setWhenTOStart] = useState(new Date().toISOString('sv-SE').slice(0, 16));
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function taskHandler(e) {
    e.preventDefault();
    if (submitting) return;

    // Task payload — unchanged shape/fields, sent to the same endpoint
    const Task = {
      taskName,
      dateOfTask: date,
      gapForNotifications: gapForNoti,
      whenToStartNotifications: whenToStart,
      customer: { id: Number(localStorage.getItem("id")) }
    };

    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-topbar">
        <Link to="/home" className="back-link">← Back to tasks</Link>
      </div>

      <h1>Add a <span>Task</span></h1>

      <form className="form-card" onSubmit={taskHandler}>
        <div className="form-field">
          <label className="form-label">Task name</label>
          <input
            type="text"
            placeholder="What do you need to do?"
            className="form-inputs"
            value={taskName}
            required
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Date of work</label>
          <input
            type="datetime-local"
            className="form-inputs"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label">Notify every</label>
            <div className="input-with-suffix">
              <input
                type="number"
                min="0"
                className="form-inputs"
                placeholder="0"
                value={gapForNoti}
                onChange={(e) => setGapForNoti(e.target.value)}
              />
              <span className="input-suffix">min</span>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Start notifying at</label>
            <input
              type="datetime-local"
              className="form-inputs"
              value={whenToStart}
              onChange={(e) => setWhenTOStart(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? "Adding…" : "Add task"}
        </button>
      </form>
    </div>
  );
}

function statusOf(dateOfTask) {
  const due = new Date(dateOfTask);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate());

  if (due < now) return "overdue";
  if (startOfDue.getTime() === startOfToday.getTime()) return "today";
  return "upcoming";
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function Home() {
  const [TaskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

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
  finally {
    setLoading(false);
  }
}
  async function taskremover(id) {
    if (!window.confirm("Remove this task?")) return;
    setRemovingId(id);
    try {
      await fetch(`https://todo-backend-l770.onrender.com/removeTask?task_id=${id}`, { method: "DELETE" });
      taskFetcher();
    } catch (err) {
      console.log(err);
    } finally {
      setRemovingId(null);
    }
  }

  useEffect(() => { taskFetcher(); }, []);

  return (
    <div className="page-wrapper">
      <div className="page-topbar">
        <h1>Your <span>Tasks</span></h1>
        <ul className="HomePage-Task-adder">
          <li>
            <Link to="/addTask" className="primary-btn">+ Add task</Link>
          </li>
        </ul>
      </div>

      {loading ? (
        <p className="state-message">Loading your tasks…</p>
      ) : TaskList.length === 0 ? (
        <div className="empty-state">
          <p className="no-task">No tasks yet.</p>
          <Link to="/addTask" className="primary-btn">Add your first task</Link>
        </div>
      ) : (
        <ul className="task-list">
          {TaskList.map((task) => {
            const status = statusOf(task.dateOfTask);
            return (
              <li key={task.task_id} className={`tasklist status-${status}`}>
                <div className="task-rail" aria-hidden="true"></div>
                <div className="task-body">
                  <div className="task-header">
                    <span className="task-name">{task.taskName}</span>
                    <span className={`status-badge status-${status}`}>
                      {status === "overdue" ? "Overdue" : status === "today" ? "Due today" : "Upcoming"}
                    </span>
                  </div>
                  <div className="task-meta">
                    <span className="task-date">Due {formatDate(task.dateOfTask)}</span>
                    <span className="task-when-to-start-notifications">
                      Notifies from {formatDate(task.whenToStartNotifications)}
                    </span>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => taskremover(task.task_id)}
                  disabled={removingId === task.task_id}
                >
                  {removingId === task.task_id ? "Removing…" : "Remove"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
