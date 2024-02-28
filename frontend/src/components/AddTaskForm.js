import React, { useState } from 'react';
import { createItem } from '../ApiClient';

const AddTaskForm = ({ lists, onTaskAdded }) => {
  const [content, setContent] = useState('');
  const [selectedList, setSelectedList] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedList) {
      console.error('No list selected');
      return;
    }
    try {
      // Create a new task using the provided content and selected list
      console.log('Creating task:', content, 'in list:', selectedList)
      const newItem = await createItem(selectedList, { content });
      // Clear the input field after creating the task
      setContent('');
      // Reset selected list
      setSelectedList('');
      // Invoke the onTaskAdded function passed as a prop with the list ID and new task object
      onTaskAdded(selectedList, newItem);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
        <option value="">Select a list</option>
        {lists.map(list => (
          <option key={list.id} value={list.id}>{list.title}</option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;