"use client";
import { useState, useEffect } from "react";
import { ChevronDown, MoreVertical, Search, User } from "lucide-react";
import Cookies from "js-cookie";
import Image from "next/image";
import toast from "react-hot-toast";

const TaskList = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    todo: true,
    inProgress: true,
    completed: true,
  });

  const [newTask, setNewTask] = useState({
    title: "",
    status: "TO-DO",
    category: "Work",
    date: "",
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...editingTask, ...newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: crypto.randomUUID() }]);
    }

    setNewTask({ title: "", status: "TO-DO", category: "Work" });
    setIsAddingTask(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      status: task.status,
      category: task.category,
    });
    setIsAddingTask(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const filteredTasks = (status) =>
    tasks.filter((task) => task.status === status);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = Cookies.get("user"); // Retrieve user from cookies
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        window.location.href = "/"; // Redirect to home or login page
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(`Error logging out: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {user ? (
              <Image
                src={user.profile_pic}
                alt="Profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
            )}
            <span className="text-sm">{user?.name}</span>
          </div>
          <button
            className=" p-1 px-3 rounded-md bg-black text-white font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 md:w-64 md:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-md border bg-white py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
          <button
            onClick={() => setIsAddingTask(true)}
            className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-1.5 text-sm text-white hover:bg-purple-700"
          >
            {editingTask ? "EDIT TASK" : "ADD TASK"}
          </button>
        </div>

        <div className="w-full flex align-middle justify-between">
          <p className="w-[40%]">Task name</p>
          <p className="w-[20%]">Due on </p>
          <p className="w-[20%]">Task Status</p>
          <p className="w-[20%]">Task Category</p>
        </div>

        {/* Task Sections */}
        <div className="space-y-4">
          {["TO-DO", "IN-PROGRESS", "COMPLETED"].map((status) => (
            <div key={status} className="rounded-lg border bg-gray-100">
              <button
                onClick={() => toggleSection(status.toLowerCase())}
                className={`flex w-full items-center justify-between ${
                  status === "TO-DO" && "bg-[#FAC3FF]"
                } ${status === "IN-PROGRESS" && "bg-[#85D9F1]"} ${
                  status === "COMPLETED" && "bg-[#CEFFEE]"
                } px-4 py-2`}
              >
                <span className="font-medium">
                  {status.replace("-", " ")} ({filteredTasks(status).length})
                </span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedSections[status.toLowerCase()] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections[status.toLowerCase()] && (
                <div className="divide-y">
                  {/* Show Add/Edit Task Form inside TO-DO Section */}
                  {status === "TO-DO" && (
                    <>
                      <p
                        onClick={() => setIsAddingTask(true)}
                        className="cursor-pointer text-blue-600 hover:underline"
                      >
                        + ADD TASK
                      </p>
                      {isAddingTask && (
                        <div className="rounded-lg border bg-white p-4 mt-4">
                          <div className="flex flex-col gap-4">
                            <input
                              type="text"
                              value={newTask.title}
                              onChange={(e) =>
                                setNewTask({
                                  ...newTask,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Task Title"
                              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            <div className="flex gap-4">
                              <select
                                value={newTask.status}
                                onChange={(e) =>
                                  setNewTask({
                                    ...newTask,
                                    status: e.target.value,
                                  })
                                }
                                className="rounded-md border px-3 py-2 text-sm"
                              >
                                <option value="TO-DO">To-Do</option>
                                <option value="IN-PROGRESS">In-Progress</option>
                                <option value="COMPLETED">Completed</option>
                              </select>
                              <select
                                value={newTask.category}
                                onChange={(e) =>
                                  setNewTask({
                                    ...newTask,
                                    category: e.target.value,
                                  })
                                }
                                className="rounded-md border px-3 py-2 text-sm"
                              >
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                              </select>
                            </div>
                            <input
                              type="date"
                              value={newTask.date}
                              onChange={(e) =>
                                setNewTask({ ...newTask, date: e.target.value })
                              }
                              className="rounded-md border px-3 py-2 text-sm"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={handleAddTask}
                                className="rounded bg-purple-600 px-4 py-2 text-sm text-white"
                              >
                                {editingTask ? "SAVE" : "ADD"}
                              </button>
                              <button
                                onClick={() => {
                                  setEditingTask(null);
                                  setIsAddingTask(false);
                                  setNewTask({
                                    title: "",
                                    status: "TO-DO",
                                    category: "Work",
                                    date: "",
                                  });
                                }}
                                className="rounded bg-gray-200 px-4 py-2 text-sm"
                              >
                                CANCEL
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Task Rows */}
                  {filteredTasks(status).map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onEdit={() => handleEditTask(task)}
                      onDelete={() => handleDeleteTask(task.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskRow = ({ task, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="relative flex items-center gap-4 p-4">
        <input
          type="checkbox"
          className="rounded border-gray-300"
          checked={task.status === "COMPLETED"}
          readOnly
        />

        <div className="flex align-middle justify-between gap-1 w-full">
          <p className="text-sm font-medium w-[40%]">{task.title}</p>

          <p
            className={`text-xs w-[20%] font-medium ${
              task.status === "TO-DO"
                ? "text-blue-500"
                : task.status === "IN-PROGRESS"
                ? "text-orange-500"
                : "text-green-500"
            }`}
          >
            Status: {task.status.replace("-", " ")}
          </p>
          <p className="text-xs text-gray-500 w-[20%]">
            Category: {task.category}
          </p>
        </div>
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-6 z-10 w-32 rounded-md border bg-white shadow-md">
              <button
                onClick={onEdit}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;
