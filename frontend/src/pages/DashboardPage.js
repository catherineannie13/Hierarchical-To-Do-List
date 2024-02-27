import React, { useState, useEffect } from 'react';
import AddTaskForm from '../components/AddTaskForm';
import AddListForm from '../components/AddListForm';
import List from '../components/List';
import { getLists } from '../ApiClient';

const DashboardPage = () => {
    const [lists, setLists] = useState([]);

    // Function to handle list creation
    const handleListCreated = async (newList) => {
        // get list from newlist
        console.log('New list created:', newList);
        // Add the new list to the existing lists
        console.log('Lists:', lists);
        setLists([...lists, newList]);
    };

    // Function to handle task creation
    const handleTaskAdded = (listId, newTask) => {
        setLists(lists.map(list => {
            if (list.id === parseInt(listId)) {
                console.log('List found:', list.tasks);
                // Ensure that tasks property is initialized and set to an array
                const updatedList = { ...list, tasks: list.tasks ? [...list.tasks, newTask] : [newTask] };
                console.log('Updated list:', updatedList.tasks);
                return updatedList;
            }
            return list;
        }));
    };    

    // Fetch lists when the component mounts
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const listsData = await getLists();
                setLists(listsData.lists);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        };
        fetchLists();
    }, []);

    return (
        <div>
            <h1>Dashboard Page In Progress</h1>
            <AddListForm onListCreated={handleListCreated} />
            <AddTaskForm lists={lists} onTaskAdded={handleTaskAdded} />
            {lists.map((list) => (
                <List key={list.id} list={list} onTaskAdded={handleTaskAdded} />
            ))}
        </div>
    );
};

export default DashboardPage;