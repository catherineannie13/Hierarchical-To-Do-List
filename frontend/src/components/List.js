import React, { useState, useEffect } from 'react';
import { getItems } from '../ApiClient';
import Task from './Task';

const List = ({ list }) => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h2>{list.title}</h2>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default List;