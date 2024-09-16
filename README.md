1. Clone the repository

bash

git clone https://github.com/Kyoru007/TasX
cd TasX

2. Install Dependencies

In the project root directory, run the following command:

bash

npm install

3. Start the Application

To start the server, navigate to the client folder and start the development server:

bash

cd client
npm run dev

Then, in a new terminal window, go to the server folder and run the Node.js server:

bash

cd ../server
npm start

4. Database Setup

Ensure that you have your database setup correctly (if applicable) in server/db.js. This project assumes you are using a MySQL database.
Usage

    Navigate to http://localhost:5173 in your browser to view the frontend of the task management app.
    Backend runs on http://localhost:5000, handling all API requests for tasks.

License

This project is licensed under the MIT License.