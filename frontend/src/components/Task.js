import React from 'react';

const Task = ({ task, onDelete, onMove, lists }) => {
  const handleDelete = () => {
    onDelete(task.id); // Pass the task id to the parent component for deletion
  };

  return (
    <li>
      {task.content}
      <button onClick={handleDelete}>✔</button>
    </li>
  );
};

export default Task;