Here’s the updated README.md without the priority feature:

markdown

# TasX

TasX is a task management application built with a React frontend and a Node.js backend connected to a MySQL database.

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd TasX

    Navigate to the client folder and install dependencies:

    bash

cd client
npm install

Install backend dependencies:

Navigate back to the main folder:

bash

cd ..

Then install dependencies for the backend:

bash

    npm install

Database Setup     
Create a MySQL database named tasx.

    CREATE DATABASE tasx;



Create the tasks table.

Use the following SQL script to create the tasks table:

sql

    USE tasx;

    CREATE TABLE tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      task VARCHAR(255) NOT NULL,
      description TEXT,
      due_date DATE,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    This script creates a table with columns for task details, completion status, and timestamps for when the task was created and last updated.

Running the Application

    Start the backend server:

    bash

node server.js

Start the frontend development server:

Navigate to the client folder:

bash

    cd client
    npm run dev

Features

    Add, edit, delete, and complete tasks.
    View tasks with their creation dates, due dates, and update dates.
    Tasks can be marked as completed with a line-through style and reverted with an undo button.

Technologies Used

    React
    Node.js
    Express
    MySQL

Troubleshooting

    Ensure that the MySQL server is running and accessible.
    Verify that all dependencies are installed.
    Check the console for any errors and address them accordingly.

License

This project is licensed under the MIT License - see the LICENSE file for details.
