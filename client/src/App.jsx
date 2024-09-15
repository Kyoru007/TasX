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
  const [completed, setCompleted] = useState(0); // Local state for completed status


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
          completed: 0, // Default to 0
        });
        setTasks([...tasks, res.data]);
        resetTaskFields();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };



  // Edit task
  const editTask = async (id) => {
    if (newTask && dueDate) {
      try {
        const res = await axios.put(`http://localhost:5000/tasks/${id}`, {
          task: newTask,
          description,
          due_date: dueDate,
          completed, // Ensure completed state is passed
        });
        setTasks(tasks.map(task => (task.id === id ? res.data : task)));
        resetTaskFields();
        setEditingTaskId(null);
      } catch (error) {
        console.error('Error editing task:', error);
      }
    } else {
      alert("Please provide both task name and due date");
    }
  };


  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id)); // Remove deleted task from local state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Toggle completion of task
  const toggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) {
        console.error('Task not found');
        return;
      }

      const updatedCompletedStatus = taskToUpdate.completed === 0 ? 1 : 0;

      const res = await axios.put(`http://localhost:5000/tasks/${id}/completed`, {
        completed: updatedCompletedStatus
      });

      console.log('Toggled completion:', res.data); // Check if completed is included

      setTasks(tasks.map(task => (task.id === id ? { ...task, completed: updatedCompletedStatus } : task)));
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
    setDueDate(task.due_date.split('T')[0]); // Format the date for the input field
    setCompleted(task.completed); // Set the completed status when editing
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
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed === 1 ? 'completed' : ''}`}>
            <h3>{task.task}</h3>
            {task.description && <p>{task.description}</p>}
            {task.due_date && <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>}
            <div className='task-actions'>
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed === 1 ? 'Undo' : 'Complete'}
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
