import React from 'react';

import './Timer.scss';

const TaskTimer = () => {
  return(
    <div className="timer-area">
      <div className="timer-wrapper">
        <div className="timer">
          <span className="minutes">00</span>
          :
          <span className="seconds">00</span>
        </div>
      </div>
      <div className="controls">
        <button type="submit" className="button start">Start</button>
        <button className="button stop" >Pause</button>
        <button className="button finish" >Finish</button>
        <button className="button cancel" >Cancel</button>

        <form className="task-form" noValidate>
          <input type="text" className="task-label" name="taskName" placeholder="Task name&hellip;" required/>
          <input type="text" className="task-label" name="desc" placeholder="Task Description&hellip;" required/>
        </form>
      </div>
    </div>
  );
};

export default TaskTimer;