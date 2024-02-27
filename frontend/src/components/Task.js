import React from 'react';

const Task = ({ task }) => {
  return (
    <li>
      {task.content} - {task.completed ? 'Completed' : 'Pending'}
    </li>
  );
};

export default Task;