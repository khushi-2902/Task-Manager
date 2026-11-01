import "./App.css"
import './index.css'

import React, { useState } from "react"

const App=()=>
{

  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("");
  const [priority,setPriority]=useState(""); 
  const [tasks,setTask]=useState([]);
  const[edit,setEdit]=useState(null);

  function submitHandler(e)
  {

       e.preventDefault();
       console.log("form is submitted");
       
        if(edit===null)
        {
       setTask((prevTask)=>[...prevTask,{title:title,category:category,priority:priority}])
        }
        else
        {
            setTask((prevTask)=>{
                return prevTask.map((item,index)=>index===edit?{title,category,priority}:item
                )
            })
        }
       setTitle("")
       setCategory("")
       setPriority("")
       setEdit(null)
  }


  function deleteTask(indexToDelete)
  {
     setTask((prevTask)=>
    {
      
        return prevTask.filter((item,index)=>index!==indexToDelete)
     
    })
  }

  function editTask(task,index)
  {
      setEdit(index)
      setTitle(task.title)
      setCategory(task.category)
      setPriority(task.priority)
  }


  // function deleteTask(task)
// {
//      setTask((prevTask)=>prevTask.filter(task.id!==id)
// }
   return (
  <div className="app-container">
    <div className="todo-wrapper">

      <header className="app-header">
        <p className="eyebrow">MY PRODUCTIVITY SPACE</p>
        <h1>My Tasks<span>.</span></h1>
        <p className="subtitle">
          Organize your day, one task at a time.
        </p>
      </header>

      <form className="todo-form" onSubmit={submitHandler}>
        <h2>Add a new task</h2>

        <div className="form-group">
          <label>Task Title</label>
          <input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="studying">Studying</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button className="submit-btn" type="submit">
            {edit === null ? "Add Task +" : "Update Task"}
          </button>
        </div>
      </form>

      <section className="tasks-section">
        <div className="section-heading">
          <h2>Your Tasks</h2>
          <span>{tasks.length} tasks</span>
        </div>

        <div className="task-list">
          {tasks.map((task, index) => (
            <div className="task-card" key={index}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <div className="task-tags">
                  <span className={`category-tag ${task.category}`}>
                    {task.category}
                  </span>
                  <span className={`priority-tag ${task.priority}`}>
                    {task.priority} priority
                  </span>
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => editTask(task, index)}
                >
                 
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="empty-state">
              <span>✦</span>
              <h3>No tasks yet!</h3>
              <p>Add your first task and start being productive.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  </div>
);
    
   
}

export default App



