import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from server
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data); // Populate the tasks from the server
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add new task
  const addTask = async () => {
    if (newTask) {
      try {
        const res = await axios.post('http://localhost:5000/tasks', {
          task: newTask,
          description,
          due_date: dueDate,
          completed: false,
          priority: false,
        });
        setTasks(prevTasks => [...prevTasks, res.data]); // Update task list locally
        resetTaskFields();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Edit task
  const editTask = async (id) => {
    if (newTask) {
      try {
        const res = await axios.put(`http://localhost:5000/tasks/${id}`, {
          task: newTask,
          description,
          due_date: dueDate,
        });
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? res.data : task));
        resetTaskFields();
        setEditingTaskId(null);
      } catch (error) {
        console.error('Error editing task:', error);
      }
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); // Remove deleted task from local state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Toggle completion of task
  const toggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      console.log(`Toggling completion for task ID: ${id}`, taskToUpdate);
      const res = await axios.put(`http://localhost:5000/tasks/${id}`, {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      });
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? res.data : task));
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  // Reset task input fields
  const resetTaskFields = () => {
    setNewTask('');
    setDescription('');
    setDueDate('');
  };

  // Start editing task
  const startEdit = (task) => {
    setNewTask(task.task);
    setDescription(task.description);
    setDueDate(task.due_date);
    setEditingTaskId(task.id);
  };

  // Toggle between day and night mode
  const toggleMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className={`app ${isNightMode ? 'night' : 'day'}`}>
      <button onClick={toggleMode} className='toggle-btn'>
        {isNightMode ? 'Day Mode' : 'Night Mode'}
      </button>

      <div className='add-task'>
        <input
          type='text'
          placeholder='Enter task...'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <textarea
          placeholder='Task description...'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {editingTaskId ? (
          <button onClick={() => editTask(editingTaskId)}>Edit Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>

      <ul className='task-list'>
        {tasks
          .sort((a, b) => b.priority - a.priority)
          .map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <h3>{task.task}</h3>
              {task.description && <p>{task.description}</p>}
              {task.due_date && <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>}
              <div className='task-actions'>
                <button onClick={() => toggleComplete(task.id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
