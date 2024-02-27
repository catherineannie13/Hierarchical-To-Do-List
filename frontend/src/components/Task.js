import React from 'react';

const Task = ({ task, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id); // Pass the task id to the parent component for deletion
  };

  return (
    <li>
      {task.content}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Task;