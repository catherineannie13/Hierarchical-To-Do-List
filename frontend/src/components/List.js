import React, { useState, useEffect } from 'react';
import { getItems } from '../ApiClient';
import Task from './Task';

const List = ({ list, onTaskDeleted, onListDeleted, lists, onTaskMoved }) => {
  const [tasks, setTasks] = useState([]);

  const handleDeleteList = () => {
    // Call the parent component's onListDeleted function with the list id
    onListDeleted(list.id);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getItems(list.id);
        setTasks(tasksData.items);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [list]);

  const handleDeleteTask = (taskId) => {
    // Call the parent component's onDelete function with the task id
    onTaskDeleted(list.id, taskId);
  };

  return (
    <div>
      <h2>
        {list.title}
        <button onClick={handleDeleteList}>Delete List</button>
      </h2>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={handleDeleteTask} onMove={onTaskMoved} listId={list.id} lists={lists} />
        ))}
      </ul>
    </div>
  );
};

export default List;