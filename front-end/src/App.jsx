import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:8000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:8000/tasks", {
      title,
      completed: false,
    });
    setTitle("");
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    await axios.put(`http://localhost:8000/tasks/${editingTask.id}`, {
      title: editTitle,
      completed: editingTask.completed,
    });
    setEditingTask(null);
    setEditTitle("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`http://localhost:8000/tasks/${task.id}`, {
      title: task.title,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const doneTasks = tasks.filter((task) => task.completed);
  const notDoneTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-5 md:p-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-3xl shadow-2xl rounded-3xl p-5 md:p-10 border border-white/20 flex flex-col">
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Tasks
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mb-8 md:mb-10">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="flex-1 p-3 md:p-4 rounded-2xl bg-white/20 text-white placeholder-gray-300 border border-white/10 shadow-lg backdrop-blur-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 md:py-4 rounded-2xl bg-blue-500/80 hover:bg-blue-600 text-white text-lg md:text-xl font-semibold shadow-lg backdrop-blur-xl"
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">Not Done</h2>
            <div className="space-y-4">
              <AnimatePresence>
                {notDoneTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-5 rounded-3xl bg-white/20 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition-transform duration-200 max-w-full break-words overflow-hidden"
                  >
                    {editingTask?.id === task.id ? (
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 items-start sm:items-center w-full">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none break-words"
                        />
                        <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0 flex-shrink-0">
                          <button
                            className="px-4 py-2 rounded-xl bg-green-500/80 text-white font-medium hover:bg-green-600"
                            onClick={saveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="px-4 py-2 rounded-xl bg-gray-500/70 text-white font-medium hover:bg-gray-600"
                            onClick={() => setEditingTask(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="flex items-center gap-4 cursor-pointer flex-1 break-all max-w-full"
                          onClick={() => toggleTask(task)}
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                            className="w-5 h-5 sm:w-6 sm:h-6 accent-blue-400"
                          />
                          <span className="text-base md:text-xl text-white break-all max-w-[calc(100%-60px)]">
                            {task.title}
                          </span>
                        </div>

                        <div className="flex gap-3 mt-2 sm:mt-0 flex-shrink-0">
                          <button
                            onClick={() => startEdit(task)}
                            className="text-blue-300 hover:text-blue-400 text-sm md:text-lg font-medium hover:cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-300 hover:text-red-400 text-sm md:text-lg font-medium hover:cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">Done</h2>
            <div className="space-y-4">
              <AnimatePresence>
                {doneTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-5 rounded-3xl bg-green-500/30 border border-green-400/30 backdrop-blur-xl shadow-lg hover:scale-105 transition-transform duration-200 max-w-full break-words overflow-hidden"
                  >
                    {editingTask?.id === task.id ? (
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 items-start sm:items-center w-full">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none break-words"
                        />
                        <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0 flex-shrink-0">
                          <button
                            className="px-4 py-2 rounded-xl bg-green-500/80 text-white font-medium hover:bg-green-600"
                            onClick={saveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="px-4 py-2 rounded-xl bg-gray-500/70 text-white font-medium hover:bg-gray-600"
                            onClick={() => setEditingTask(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="flex items-center gap-4 cursor-pointer flex-1 break-all max-w-full"
                          onClick={() => toggleTask(task)}
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                            className="w-5 h-5 sm:w-6 sm:h-6 accent-green-400"
                          />
                          <span className="text-base md:text-xl line-through text-gray-200 break-all max-w-[calc(100%-60px)]">
                            {task.title}
                          </span>
                        </div>

                        <div className="flex gap-3 mt-2 sm:mt-0 flex-shrink-0">
                          <button
                            onClick={() => startEdit(task)}
                            className="text-blue-300 hover:text-blue-400 text-sm md:text-lg font-medium hover:cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-300 hover:text-red-400 text-sm md:text-lg font-medium hover:cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
