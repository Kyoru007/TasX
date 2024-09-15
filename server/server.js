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

// Your routes for handling tasks go here



// GET all tasks
// Fetch tasks sorted by priority and date
app.get('/tasks', (req, res) => {
    con.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


// POST a new task
// Adding task
app.post('/tasks', (req, res) => {
    const { task, description, due_date } = req.body;
    const sql = 'INSERT INTO tasks (task, description, due_date) VALUES (?, ?, ?)';
    con.query(sql, [task, description, due_date], (err, result) => {
      if (err) throw err;
      res.status(201).send({ id: result.insertId, task, description, due_date, completed: false, priority: false });
    });
  });
  
  // Editing task
  app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task, description, due_date } = req.body;
    const sql = 'UPDATE tasks SET task = ?, description = ?, due_date = ? WHERE id = ?';
    con.query(sql, [task, description, due_date, id], (err, result) => {
      if (err) throw err;
      res.send({ id, task, description, due_date });
    });
  });
  
  // Deleting task
  app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    con.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Task deleted' });
    });
  });
  
  // Marking task as completed
  app.put('/tasks/complete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE tasks SET completed = !completed WHERE id = ?';
    con.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Task status updated' });
    });
  });
  



// Update a task (PUT request)
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    con.query('UPDATE tasks SET ? WHERE id = ?', [updatedTask, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(updatedTask);
    });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    con.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Task deleted');
    });
});



// Start the server

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
