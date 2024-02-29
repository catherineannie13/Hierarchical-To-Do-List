# **Hierarchical To-Do List Frontend**

This document outlines the setup and usage instructions for the frontend of a hierarchical to-do list application. The frontend is developed using React, a JavaScript library for building user interfaces, and communicates with a backend server for data management.

## **Getting Started**

### **Prerequisites**

- Node.js and npm (Node Package Manager)
- A running instance of the backend server for the hierarchical to-do list

### **Installation**

1. Copy the directory to your local machine.
2. Navigate to the frontend directory:
    
    ```
    cd frontend
    
    ```
    
3. Install the required npm packages:
    
    ```
    npm install
    
    ```
    
4. Start the React application:
    
    ```
    npm start
    
    ```
    

The application should open in your default web browser, typically at **`http://localhost:3000`**.

## **Application Structure**

├── package.json\
├── package-lock.json\
├── src/\
│   ├── components/\
│   ├── pages/\
│   ├── ApiClient.js\
│   ├── axiosConfig.js\
│   ├── App.js\
│   ├── index.js\
│   └── index.css\
└── public/\
    ├── index.html\
    └── favicon.ico

## **Features**

- **User Authentication**: Supports logging in and out. The interface dynamically adjusts based on the user's authentication state.
- **Dynamic List and Task Management**: Allows for the creation, modification, and deletion of lists and tasks. Tasks can be organized hierarchically as subtasks of other tasks.
- **Interactive UI for Task Hierarchy**: Tasks can be expanded to view their subtasks, supporting an unlimited hierarchy depth.
- **Drag-and-Drop**: (If implemented) Supports rearranging tasks through drag-and-drop interactions.
- **Responsive Design**: Ensures a good user experience across various device sizes.

## **Key Components**

- **LoginPage**: Manages user login.
- **DashboardPage**: The main interface for interacting with to-do lists and tasks.
- **TaskForm**: A form component for adding new tasks or subtasks.
- **ListForm**: A form component for adding new lists.
- **Task**: Represents a single task or subtask, including any hierarchical relationships.

## **API Integration**

The frontend communicates with the backend through various API endpoints to perform operations on lists and tasks. The **`ApiClient.js`** module centralizes these API calls, providing functions that other components can use to interact with the backend.