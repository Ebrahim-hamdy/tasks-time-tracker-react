import React from 'react';

import TaskTimer from './Timer/Timer';
import TaskList from './List/List';

const TaskComponent = () => {
  const tasks = [
    {
      name: 'First Task',
      description: 'Task desc',
      minutes: '00',
      seconds: '39'
    },
    {
      name: 'Second Task',
      description: 'Task Description',
      minutes: '03',
      seconds: '19'
    }
  ];

  return(
    <div className="app app--main">
      <TaskTimer />
      <TaskList  tasks={tasks}/>
    </div>
  );
};

export default TaskComponent;