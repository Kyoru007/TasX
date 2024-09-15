import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import con from './db.js'; // Ensure this is pointing to your MySQL connection file

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.static('Public'));

// Fetch all tasks
app.get('/tasks', (req, res) => {
    con.query('SELECT id, task, description, due_date, COALESCE(completed, 0) as completed FROM tasks', (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { task, description, due_date } = req.body;
    const sql = 'INSERT INTO tasks (task, description, due_date) VALUES (?, ?, ?)';
    con.query(sql, [task, description, due_date], (err, result) => {
        if (err) throw err;
        res.status(201).send({ id: result.insertId, task, description, due_date, completed: 0 });
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task, description, due_date } = req.body;
    const sql = 'UPDATE tasks SET task = ?, description = ?, due_date = ? WHERE id = ?';
    con.query(sql, [task, description, due_date, id], (err, result) => {
        if (err) throw err;
        res.send({ id, task, description, due_date });
    });
});

// Update the completed status of a task
app.put('/tasks/:id/completed', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
    con.query(sql, [completed, id], (err, result) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).send('Server error');
        }

        // Fetch the updated task
        con.query('SELECT * FROM tasks WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error('Error fetching updated task:', err);
                return res.status(500).send('Server error');
            }
            res.json(result[0]); // Send the updated task back to the client
        });
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    con.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Task deleted');
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
