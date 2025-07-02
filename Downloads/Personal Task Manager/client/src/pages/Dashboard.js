import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task._id);
    setEditValue(task.title);
  };

  const handleUpdateTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { title: editValue });
      setTasks(tasks.map(task => task._id === id ? res.data : task));
      setEditingTask(null);
      setEditValue('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 px-4 py-2 border rounded shadow"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add</button>
      </form>
      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task._id} className="flex items-center justify-between bg-white p-3 rounded shadow">
            {editingTask === task._id ? (
              <>
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="border px-2 py-1 rounded mr-2"
                />
                <button onClick={() => handleUpdateTask(task._id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                <button onClick={() => setEditingTask(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div>
                  <button onClick={() => handleEditTask(task)} className="bg-yellow-400 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard; 