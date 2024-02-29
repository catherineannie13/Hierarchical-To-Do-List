import React, { useState } from 'react';
import { createItem } from '../ApiClient';

const AddTaskForm = ({ lists, onTaskAdded }) => {
  const [content, setContent] = useState('');
  const [selectedList, setSelectedList] = useState('');

  // When the form is submitted, create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedList) {
      console.error('No list selected');
      return;
    }
    try {

      // Explicitly include parent_id as null for top-level tasks
      const itemData = {
        content: content,
        parent_id: null  // Explicitly setting parent_id as null
      };

      console.log('Creating task:', content, 'in list:', selectedList, 'with parent_id:', itemData.parent_id);
      const newItem = await createItem(selectedList, itemData);

      // Clear the input field after creating the task
      setContent('');
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