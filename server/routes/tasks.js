import express from 'express';
import con from '../db.js';  // Import the DB connection from server.js or db.js

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const [tasks] = await con.query('SELECT * FROM tasks');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const { task, description, completed, priority } = req.body;

    try {
        const [result] = await con.query('INSERT INTO tasks (task, description, completed, priority) VALUES (?, ?, ?, ?)', [task, description, completed, priority]);

        const newTask = { id: result.insertId, task, description, completed, priority };
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add task' });
    }
});

// PUT (Update) a task by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { task, description, completed, priority } = req.body;

    try {
        const [result] = await con.query('UPDATE tasks SET task = ?, description = ?, completed = ?, priority = ? WHERE id = ?', [task, description, completed, priority, id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json({ id, task, description, completed, priority });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await con.query('DELETE FROM tasks WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(204).send(); // No content response
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

export { router as tasksRouter };
