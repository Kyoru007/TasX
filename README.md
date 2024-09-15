TasX

TasX is a task management application built with React and Node.js. It allows users to create, edit, delete, and complete tasks while keeping track of deadlines and timestamps. The application also supports light and dark mode.
Features

    Add Tasks: Create new tasks with a description, due date, and priority status.
    Edit Tasks: Modify existing tasks.
    Delete Tasks: Remove tasks from the list.
    Complete/Undo Tasks: Mark tasks as completed or revert them back.
    View Dates: Display the task's creation date, last updated date, and due date.
    Light/Dark Mode: Switch between light and dark themes.

Tech Stack

    Frontend: React, Axios, CSS
    Backend: Node.js, Express
    Database: MongoDB

Installation
Prerequisites

    Node.js and npm installed on your machine.
    MongoDB instance running locally or remotely.

Setup

    Clone the Repository

    bash

git clone https://github.com/your-username/tasx.git
cd tasx

Install Dependencies

    For the server:

    bash

cd server
npm install

For the client:

bash

    cd ../client
    npm install

Configure Environment Variables

Create a .env file in the server directory with the following content:

env

PORT=5000
MONGO_URI=mongodb://localhost:27017/tasx

Run the Application

    Start the backend server:

    bash

cd server
node server.js

Start the frontend:

bash

        cd ../client
        npm start

    Your application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

API Endpoints

    GET /tasks: Retrieve all tasks.
    POST /tasks: Create a new task.
    PUT /tasks/
    : Update an existing task.
    DELETE /tasks/
    : Delete a task.
    PATCH /tasks/
    /move-to-top: Move a task to the top of the list (optional).

Usage

    Adding a Task: Fill in the task name, description, due date, and click "Add Task".
    Editing a Task: Click "Edit" on a task to modify its details.
    Completing/Undoing a Task: Click "Complete" or "Undo" to change the task's completion status.
    Deleting a Task: Click "Delete" to remove a task from the list.
    Switching Modes: Click "Day Mode" or "Night Mode" to toggle between light and dark themes.