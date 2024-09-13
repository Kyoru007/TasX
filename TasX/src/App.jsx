import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [isNightMode, setIsNightMode] = useState(false);

  const addTask = () => {
    if (newTask) {
      const newEntry = {
        id: Date.now(),
        task: newTask,
        description,
        completed: false,
        priority: false,
      };
      setTasks([...tasks, newEntry]);
      setNewTask('');
      setDescription('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const togglePriority = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority: !task.priority } : task
    ));
  };

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
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className='task-list'>
        {tasks
          .sort((a, b) => b.priority - a.priority)
          .map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <h3>{task.task}</h3>
              {task.description && <p>{task.description}</p>}
              <div className='task-actions'>
                <button onClick={() => toggleComplete(task.id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => togglePriority(task.id)}>
                  {task.priority ? 'Remove Priority' : 'Set Priority'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
