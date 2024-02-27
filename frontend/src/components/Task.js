import React, { useState } from 'react';

const Task = ({ task, onDelete, onMove, listId, lists }) => {
  const [selectedListId, setSelectedListId] = useState('');

  const handleMove = () => {
    if (selectedListId) {
      onMove(listId, task.id, selectedListId);
    }
  };

  return (
    <li>
      {task.content}
      <select onChange={(e) => setSelectedListId(e.target.value)} value={selectedListId}>
        <option value="">Move to...</option>
        {lists.filter(list => list.id !== listId).map(list => (
          <option key={list.id} value={list.id}>{list.title}</option>
        ))}
      </select>
      <button onClick={handleMove}>Move</button>
      <button onClick={onDelete}>✔</button>
    </li>
  );
};

export default Task;