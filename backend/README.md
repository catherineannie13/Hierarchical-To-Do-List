# **Hierarchical To-Do List Backend**

This document provides a comprehensive guide for setting up and using the backend for a hierarchical to-do list application. The backend is built using Flask, a micro web framework written in Python, and utilizes Flask-Login for user authentication, Flask-Migrate for database migrations, and Flask-CORS for handling Cross-Origin Resource Sharing (CORS).

## **Getting Started**

### **Prerequisites**

- Python 3.8 or higher
- Flask
- Flask-Login
- Flask-Migrate
- Flask-CORS
- SQLite (for development purposes)

### **Installation**

1. Copy directory to your local machine.
2. Navigate to the backend directory:
    
    ```
    cd backend
    
    ```

3. Create a virtual environment:

    ```
    python -m venv venv
    
    ```

4. Activate virtual environment:

    ```
    venv\Scripts\activate (Windows) OR source venv/bin/activate (Mac)
    
    ```
 
5. Install the required Python packages:
    
    ```
    pip install -r requirements.txt
    
    ```
    
6. Initialize the database:
    
    ```
    flask db upgrade
    
    ```
    
7. Start the Flask application:
    
    ```
    flask run
    
    ```
    

The backend server will start, typically on **`http://localhost:5000`**.

## **Backend Application Structure**

├── app/
│   ├── __init__.py
│   ├── auth.py
│   ├── main.py
│   └── models.py
├── test_auth.py
└── test_main.py

## **Features**

- **User Authentication**: Supports user registration, login, and logout functionalities.
- **CRUD Operations**: Allows creating, reading, updating, and deleting lists and items.
- **Hierarchical Items**: Supports creating subtasks within tasks to allow for a hierarchical structure of to-do items.
- **Move Items**: Enables moving items between lists or within the hierarchy of tasks and subtasks.

## **API Endpoints**

### **Authentication**

- **POST /register**: Registers a new user.
- **POST /login**: Logs in an existing user.
- **GET /logout**: Logs out the current user.
- **GET /is_authenticated**: Checks if the user is currently authenticated.
- **GET /current_user**: Retrieves the current logged-in user's information.

### **To-Do Lists and Items**

- **GET /lists**: Retrieves all lists for the current user.
- **POST /lists**: Creates a new list.
- **PUT /lists/<list_id>**: Updates an existing list.
- **DELETE /lists/<list_id>**: Deletes an existing list.
- **GET /lists/<list_id>/items**: Retrieves all items in a specific list.
- **POST /lists/<list_id>/items**: Creates a new item in a specific list.
- **PUT /lists/<list_id>/items/<item_id>**: Updates an existing item in a list.
- **DELETE /lists/<list_id>/items/<item_id>**: Deletes an item from a list.
- **PUT /lists/<list_id>/items/<item_id>/complete**: Marks an item as complete or incomplete.
- **PUT /lists/<from_list_id>/items/<item_id>/move**: Moves an item and its subtasks to another list.
- **GET /lists/<list_id>/items/<item_id>/subitems**: Retrieves all subitems of an item.

## **Testing**

Unit tests are provided to ensure the reliability of the application's functionalities. To run the tests, use the following command:

```
python test_main.py

```

This will run all tests written in **`test_main.py`**.