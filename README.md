# **Hierarchical To-Do List Application**

This comprehensive guide covers both the frontend and backend setups for a hierarchical to-do list application. The frontend is developed with React, while the backend uses Flask, offering a full-stack solution for managing tasks in a hierarchical structure.

## **Getting Started**

### **Backend Setup**

### Prerequisites

- Python 3.8 or higher
- Flask and its extensions: Flask-Login, Flask-Migrate, Flask-CORS
- SQLite (for development purposes)

### Installation

1. Clone the repository to your local machine.
2. Navigate to the backend directory and create a virtual environment: **`python -m venv venv`**
3. Activate the virtual environment:
    - Windows: **`venv\Scripts\activate`**
    - macOS/Linux: **`source venv/bin/activate`**
4. Install the required dependencies: **`pip install -r requirements.txt`**
5. Initialize the database with **`flask db upgrade`**
6. Start the Flask application: **`flask run`**

The backend server typically starts at **`http://localhost:5000`**.

### **Frontend Setup**

### Prerequisites

- Node.js and npm
- The backend server running

### Installation

1. Navigate to the frontend directory: **`cd frontend`**  
2. Install the required npm packages: **`npm install`**
3. Start the React application: **`npm start`**

The application should open in your default web browser, typically at **`http://localhost:3000`**.

## **Features**

### **Backend**

- **User Authentication**: Register, login, and logout functionalities.
- **CRUD Operations**: Manage lists and tasks with create, read, update, and delete capabilities.
- **Hierarchical Structure**: Organize tasks as subtasks within other tasks.
- **Move Items**: Transfer items between lists or within the task hierarchy.

### **Frontend**

- **Dynamic UI**: Interact with tasks and lists in real-time.
- **Hierarchical Display**: View and manage tasks and their subtasks.
- **User Authentication**: Login and logout features.
- **Responsive Design**: Ensures usability across different device sizes.

## **API Endpoints**

- Authentication routes: **`/register`**, **`/login`**, **`/logout`**, **`/is_authenticated`**, **`/current_user`**
- List and item management routes: **`/lists`**, **`/lists/<list_id>`**, **`/lists/<list_id>/items`**, **`/lists/<list_id>/items/<item_id>`**, etc.

## **Application Structure**

frontend/
├── package.json
├── package-lock.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── ApiClient.js
│   ├── axiosConfig.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── public/
    ├── index.html
    └── favicon.ico
    
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py
│   ├── main.py
│   └── models.py
├── test_auth.py
└── test_main.py


## **Testing**

### **Backend**

Unit tests ensure functionality reliability. Execute **`python test_main.py`** to run tests.