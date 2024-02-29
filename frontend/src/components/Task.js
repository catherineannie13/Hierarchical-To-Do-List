import React, { useState, useEffect } from 'react';
import { getItems } from '../ApiClient';

const Task = ({ task, onDelete, onMove, listId, lists, onAddSubtask, parentTaskId=null }) => {
    const [showSubtasks, setShowSubtasks] = useState(false);
    const [selectedListId, setSelectedListId] = useState('');
    const [subtaskContent, setSubtaskContent] = useState('');
    const [subtasks, setSubtasks] = useState([]);

    // Function to handle moving a task to another list
    const handleMove = () => {
        if (selectedListId) {
            onMove(listId, task.id, selectedListId);
        }
    };

    // Function to handle deleting a task
    const handleDelete = () => {
        onDelete(task.id);
    };

    // Function to toggle the display of subtasks
    const toggleSubtasks = () => setShowSubtasks(!showSubtasks);

    // Function to handle adding a subtask
    const handleAddSubtaskSubmit = (e) => {
      e.preventDefault();
      onAddSubtask(task.id, subtaskContent);
      setSubtaskContent('');
    };
    
    // Fetch subtasks when the component mounts
    useEffect(() => {
      const fetchItemsAndFilterSubtasks = async () => {
        try {
            const itemsData = await getItems(listId);
            const filteredSubtasks = itemsData.items.filter(item => item.parent_id === task.id);
            setSubtasks(filteredSubtasks);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
      };

      fetchItemsAndFilterSubtasks();
    }, [task.id, listId, subtaskContent]);

    return (
        <>
            <li>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span>{task.content}</span>
                    <button onClick={toggleSubtasks} style={{ marginLeft: '10px' }}>
                       {showSubtasks ? 'Hide' : 'Show'} Subtasks
                    </button>
                    <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button>
                    {parentTaskId === null && (
                        <>
                            <select 
                                onChange={(e) => setSelectedListId(e.target.value)} 
                                value={selectedListId} 
                                style={{ marginLeft: '10px' }}
                            >
                                <option value="">Move to...</option>
                                {lists.filter(list => list.id !== listId).map(list => (
                                    <option key={list.id} value={list.id}>{list.title}</option>
                                ))}
                            </select>
                            <button onClick={handleMove} style={{ marginLeft: '5px' }}>Move</button>
                        </>
                    )}
                    <form onSubmit={handleAddSubtaskSubmit} style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                        <input 
                            type="text" 
                            value={subtaskContent}
                            onChange={(e) => setSubtaskContent(e.target.value)}
                            placeholder="Subtask name"
                            style={{ marginLeft: '5px' }}
                        />
                        <button type="submit" style={{ marginLeft: '5px' }}>Add Subtask</button>
                    </form>
                </div>
                {showSubtasks && subtasks && (
                    <ul>
                        {subtasks.map((subtask) => (
                            <Task
                                key={subtask.id}
                                task={subtask}
                                onDelete={onDelete}
                                onMove={onMove}
                                listId={listId}
                                lists={lists}
                                onAddSubtask={onAddSubtask}
                                parentTaskId={task.id}
                            />
                        ))}
                    </ul>
                )}
            </li>
        </>
    );
};

export default Task;