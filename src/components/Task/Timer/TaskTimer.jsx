import React from "react";

import TaskForm from "../Form/TaskForm";

import "./TaskTimer.scss";

class TaskTimer extends React.Component {
  state = {
    task: this.props.task,
    isRunning: false,
    showForm: false,
    isValid: false
  };

  timerTime = 0;
  baseState = this.state;

  startTask = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));

    if (!this.state.isRunning && this.state.isValid) {
      this.setState({
        showForm: false,
        isRunning: true
      });

      this.interval = setInterval(() => {
        this.timerTime = this.timerTime + 1;
        this.setState({
          task: {
            minutes: Math.floor(this.timerTime / 60),
            seconds: this.timerTime % 60
          }
        });
      }, 1000);
    }
  };

  stopTask = () => {
    this.setState({ isRunning: false });
    clearInterval(this.interval);
  };

  cancelTask = () => {
    this.stopTask();
    this.resetTimer();
  };

  saveTask = () => {
    this.cancelTask();
  };

  resetTimer = () => {
    this.timerTime = 0;
    this.setState(this.baseState);
  };

  render() {
    const { task, isRunning, showForm, isValid } = this.state;

    return (
      <div className="timer-area">
        <div
          className={`timer-wrapper ${
            isRunning ? "timer-wrapper--running" : ""
          }`}
        >
          <div className="timer">
            <span className="minutes">
              {task.minutes > 9 ? task.minutes : `0${task.minutes}`}
            </span>
            :
            <span className="seconds">
              {task.seconds > 9 ? task.seconds : `0${task.seconds}`}
            </span>
          </div>
        </div>
        <div className="controls">
          <button
            type="submit"
            className="button start"
            onClick={this.startTask}
          >
            Start
          </button>
          <button
            className="button stop"
            onClick={this.stopTask}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button
            className="button finish"
            onClick={this.saveTask}
            disabled={!isRunning}
          >
            Finish
          </button>
          <button className="button cancel" onClick={this.cancelTask}>
            Cancel
          </button>

          <TaskForm showForm={showForm} isValid={isValid} />
        </div>
      </div>
    );
  }
}

export default TaskTimer;
