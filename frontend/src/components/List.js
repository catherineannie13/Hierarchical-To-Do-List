import React, { useState, useEffect } from 'react';
import { getItems } from '../ApiClient';
import Task from './Task';

const List = ({ list, onTaskDeleted, onListDeleted, lists, onTaskMoved, onAddSubtask }) => {
  const [tasks, setTasks] = useState([]);

  const handleDeleteList = () => {

    // Call the parent component's onListDeleted function with the list id
    onListDeleted(list.id);
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getItems(list.id);
        console.log('Logging tasks:', tasksData.items);
        setTasks(tasksData.items.filter(task => !task.parent_id));
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

  // Function to handle adding a subtask
  const handleAddSubtask = (parentId, content) => {
    onAddSubtask(parentId, content, list.id);
  };

  return (
    <div>
      <h2>
        {list.title}
        <button onClick={handleDeleteList} className='delete-button' id='delete-button-list'>Delete</button>
      </h2>
      <ul>
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            task={task} 
            onDelete={handleDeleteTask} 
            onMove={onTaskMoved} 
            listId={list.id} 
            lists={lists} 
            onAddSubtask={handleAddSubtask} 
          />
        ))}
      </ul>
    </div>
  );
};

export default List;