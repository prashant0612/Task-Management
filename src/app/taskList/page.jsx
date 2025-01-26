"use client";

import { useState } from "react";
import { ChevronDown, MoreVertical, Plus, Search, User } from "lucide-react";

const TaskList = () => {
  const [view, setView] = useState("List");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    todo: true,
    inProgress: true,
    completed: true,
  });

  const tasks = [
    {
      id: 1,
      title: "Interview with Design Team",
      dueDate: "Today",
      status: "TO-DO",
      category: "Work",
    },
    {
      id: 2,
      title: "Team Meeting",
      dueDate: "30 Dec, 2024",
      status: "TO-DO",
      category: "Personal",
    },
    {
      id: 3,
      title: "Design a Dashboard page along with wireframes",
      dueDate: "31 Dec, 2024",
      status: "TO-DO",
      category: "Work",
    },
    {
      id: 4,
      title: "Morning Workout",
      dueDate: "Today",
      status: "IN-PROGRESS",
      category: "Work",
    },
    {
      id: 5,
      title: "Code Review",
      dueDate: "Today",
      status: "IN-PROGRESS",
      category: "Personal",
    },
    {
      id: 6,
      title: "Update Task Tracker",
      dueDate: "25 Dec, 2024",
      status: "IN-PROGRESS",
      category: "Work",
    },
    {
      id: 7,
      title: "Submit Project Proposal",
      dueDate: "Today",
      status: "COMPLETED",
      category: "Work",
    },
    {
      id: 8,
      title: "Birthday Gift Shopping",
      dueDate: "Today",
      status: "COMPLETED",
      category: "Personal",
    },
    {
      id: 9,
      title: "Client Presentation",
      dueDate: "25 Dec, 2024",
      status: "COMPLETED",
      category: "Work",
    },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold">TaskBuddy</div>
            <div className="flex gap-4 text-sm">
              <button
                className={
                  view === "List" ? "text-purple-600" : "text-gray-500"
                }
                onClick={() => setView("List")}
              >
                List
              </button>
              <button
                className={
                  view === "Board" ? "text-purple-600" : "text-gray-500"
                }
                onClick={() => setView("Board")}
              >
                Board
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
              <span className="text-sm">Aravind</span>
            </div>
            <button className="text-sm text-gray-500">Logout</button>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5">
              <span className="text-sm">Category</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5">
              <span className="text-sm">Due Date</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64 md:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-md border bg-white py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <button
              onClick={() => setIsAddingTask(true)}
              className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-1.5 text-sm text-white hover:bg-purple-700"
            >
              ADD TASK
            </button>
          </div>
        </div>

        {/* Task Sections */}
        <div className="space-y-4">
          {/* Todo Section */}
          <div className="rounded-lg border bg-white">
            <button
              onClick={() => toggleSection("todo")}
              className="flex w-full items-center justify-between bg-pink-100 px-4 py-2"
            >
              <span className="font-medium">Todo (3)</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expandedSections.todo ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSections.todo && (
              <div className="divide-y">
                {isAddingTask && (
                  <div className="flex items-center gap-4 p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="Task Title"
                      className="flex-1 text-sm focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Escape")
                          setIsAddingTask(false);
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <button className="rounded bg-purple-600 px-3 py-1 text-xs text-white">
                        ADD
                      </button>
                      <button
                        onClick={() => setIsAddingTask(false)}
                        className="rounded px-3 py-1 text-xs text-gray-500"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                )}
                {tasks
                  .filter((task) => task.status === "TO-DO")
                  .map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
              </div>
            )}
          </div>

          {/* In Progress Section */}
          <div className="rounded-lg border bg-white">
            <button
              onClick={() => toggleSection("inProgress")}
              className="flex w-full items-center justify-between bg-blue-100 px-4 py-2"
            >
              <span className="font-medium">In-Progress (3)</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expandedSections.inProgress ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSections.inProgress && (
              <div className="divide-y">
                {tasks
                  .filter((task) => task.status === "IN-PROGRESS")
                  .map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
              </div>
            )}
          </div>

          {/* Completed Section */}
          <div className="rounded-lg border bg-white">
            <button
              onClick={() => toggleSection("completed")}
              className="flex w-full items-center justify-between bg-green-100 px-4 py-2"
            >
              <span className="font-medium">Completed (3)</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expandedSections.completed ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSections.completed && (
              <div className="divide-y">
                {tasks
                  .filter((task) => task.status === "COMPLETED")
                  .map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskRow = ({ task }) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <input
        type="checkbox"
        className="rounded border-gray-300"
        checked={task.status === "COMPLETED"}
        readOnly
      />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{task.title}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span>{task.dueDate}</span>
        <span
          className={`rounded px-2 py-0.5 text-xs ${
            task.status === "TO-DO"
              ? "bg-gray-100"
              : task.status === "IN-PROGRESS"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.status}
        </span>
        <span className="text-gray-500">{task.category}</span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskList;
