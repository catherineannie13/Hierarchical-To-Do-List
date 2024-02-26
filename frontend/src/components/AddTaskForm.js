import React, { useState, useEffect } from 'react';
import { getLists, createItem } from '../ApiClient';

const AddTaskForm = ({ onTaskAdded }) => {
  const [content, setContent] = useState('');
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');

  useEffect(() => {
    // Fetch the user's lists when the component mounts
    const fetchLists = async () => {
      try {
        const listsData = await getLists();
        setLists(listsData.lists);
        // Select the first list by default
        if (listsData.lists.length > 0) {
          setSelectedList(listsData.lists[0].id);
        }
      } catch (error) {
        console.error('Error fetching lists:', error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchLists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new task using the selected list and task content
      const newItem = await createItem(selectedList, { content });
      onTaskAdded(newItem); // Pass the new item data to the parent component
      setContent(''); // Clear the input field after adding the task
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;