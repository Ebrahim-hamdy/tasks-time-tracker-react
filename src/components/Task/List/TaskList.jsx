import React from "react";

import TaskForm from '../Form/TaskForm';

import './TaskList.scss';

const TaskList = (props) => {
  const tasks = props.tasks;

  return(
    <div className="task-area">
      <div className="card">
        <div className="card-header">Search Task
          <button className="add-task" ></button>
        </div>

        <div className="card-body">
          <input type="text" className="task-label" name="taskTitle" placeholder="Task name&hellip;"/>
          <input type="text" className="task-label" name="taskDesc" placeholder="Task Description&hellip;"/>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Completed Tasks
          <button className="sort-async" ></button>
        </div>

        <div className="card-body">
          <ul className="timer-list">
          {tasks.map((task, i) => {
            return(
               <li key={i}>
                 <button className="edit-task" ></button>
                 <button className="delete-task"  ></button>
                 <div>Task name: <span>{task.name}</span></div>
                 <div>Task description: <span>{task.description}</span></div>
                 <div>Task duration:
                   <span>{task.minutes} Minutes And</span>
                   <span>{task.seconds} Seconds</span>
                 </div>
               </li>
            );
          })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;