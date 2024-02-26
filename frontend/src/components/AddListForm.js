import React, { useState } from 'react';
import { createList } from '../ApiClient';

const AddListForm = ({ onListCreated }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new list using the provided title
      const newList = await createList({ title });
      onListCreated(newList); // Pass the new list data to the parent component
      setTitle(''); // Clear the input field after creating the list
    } catch (error) {
      console.error('Error creating list:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Create List</button>
    </form>
  );
};

export default AddListForm;
