A simple React-based To-Do List application that allows users to manage tasks with the ability to:

    Add tasks with descriptions.
    Mark tasks as completed with a strikethrough effect.
    Prioritize tasks by moving them to the top of the list.
    Delete tasks.
    Toggle between Day and Night mode for better visual comfort.
    Hover over tasks to see a shadow effect.

Features

    CRUD Operations: Create, update, and delete tasks.
    Task Completion: Mark tasks as completed with a strikethrough. Completed tasks will stay in the list until they are deleted.
    Day/Night Mode: A button that allows switching between light and dark themes.
    Hover Effects: Each task will have a shadow effect when hovered over.
    Task Descriptions: You can add a description to each task.
    Task Prioritization: Tasks can be prioritized and sorted at the top of the list with a click.

Installation
Prerequisites

    Node.js installed on your machine
    npm (comes with Node.js)

Steps to Run Locally

    Clone the Repository:

    bash

git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app

Install Dependencies:

bash

npm install

Run the App:

bash

    npm start

    This will run the app in development mode. Open http://localhost:3000 to view it in your browser.

Usage

    Add a new task by entering a title and description.
    Mark tasks as completed by clicking the "Complete" button. Completed tasks will be crossed out.
    Prioritize tasks by clicking the "Set Priority" button. This will move them to the top of the list.
    Delete tasks by clicking the "Delete" button.
    Toggle between Day and Night mode by clicking the toggle button at the top.
    Hover over any task to see the shadow effect.

Folder Structure

bash

src/
│
├── App.js        # Main component of the application
├── App.css       # Styling for the app
└── index.js      # Entry point for the app

Customization

Feel free to update the styling in App.css or modify the components in App.js to fit your requirements.