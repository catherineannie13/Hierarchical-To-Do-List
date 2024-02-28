import React, { useState } from 'react';

const Task = ({ task, onDelete, onMove, listId, lists, onAddSubtask, parentTaskId = null }) => {
    const [showSubtasks, setShowSubtasks] = useState(false);
    const [selectedListId, setSelectedListId] = useState('');
    const [subtaskContent, setSubtaskContent] = useState('');

    const handleMove = () => {
        if (selectedListId) {
            onMove(listId, task.id, selectedListId);
        }
    };

    const handleDelete = () => {
        onDelete(task.id);
    };

    const toggleSubtasks = () => setShowSubtasks(!showSubtasks);

    const handleAddSubtaskSubmit = (e) => {
        e.preventDefault();
        onAddSubtask(task.id, subtaskContent);
        setSubtaskContent('');
    };

    return (
        <>
            <li>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {task.content}
                    {task.subtasks && task.subtasks.length > 0 && (
                        <button onClick={toggleSubtasks}>{showSubtasks ? 'Hide' : 'Show'} Subtasks</button>
                    )}
                    <button onClick={handleDelete}>Delete</button>
                    {parentTaskId === null && (
                        <>
                            <select onChange={(e) => setSelectedListId(e.target.value)} value={selectedListId}>
                                <option value="">Move to...</option>
                                {lists.filter(list => list.id !== listId).map(list => (
                                    <option key={list.id} value={list.id}>{list.title}</option>
                                ))}
                            </select>
                            <button onClick={handleMove}>Move</button>
                        </>
                    )}
                    <form onSubmit={handleAddSubtaskSubmit} style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                        <input 
                            type="text" 
                            value={subtaskContent}
                            onChange={(e) => setSubtaskContent(e.target.value)}
                            placeholder="Subtask name" 
                        />
                        <button type="submit">Add Subtask</button>
                    </form>
                </div>
                {showSubtasks && task.subtasks && (
                    <ul> {/* This ul nests subtasks within the current task */}
                        <p>nested task here</p>
                        {task.subtasks.map(subtask => (
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