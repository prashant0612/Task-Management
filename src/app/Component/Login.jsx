"use client";
import { LayoutDashboard, LayoutList } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
  const [view, setView] = useState("list");
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <div className="p-6 flex align-middle items-center justify-between min-h-screen overflow-hidden">
      {/* Left Section - Login */}
      <div className=" w-[30%] flex-col justify-center p-12 h-full">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-purple-100 p-2">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-purple-600">TaskBuddy</h1>
          </div>
          <p className="text-gray-600">
            Streamline your workflow and track progress effortlessly with our
            all-in-one task management app.
          </p>
          <button className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gray-900 px-4 py-3 text-white transition hover:bg-gray-800">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>

      {/* Right Section - Task List */}
      <div className=" w-[65%] rounded-xl bg-contain bg-[url('/circles_bg.png')] ">
        <div className=" p-6 bg-white flex flex-col gap-2 shadow-md rounded-3xl translate-x-[30%]">
          <div className="">
            <div className="flex flex-col items-start justify-start">
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-xl font-semibold">TaskBuddy</h2>
                <div className="flex rounded-lg border">
                  <button
                    className={`flex items-center space-x-1 px-3 py-1.5 ${
                      view === "list" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setView("list")}
                  >
                    <LayoutList className="h-4 w-4" />
                    <span>List</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 px-3 py-1.5 ${
                      view === "board" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setView("board")}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Board</span>
                  </button>
                </div>
              </div>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Filter by:</span>
                  <select className="rounded-md border px-2 py-1 text-sm">
                    <option>Category</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="rounded-md border px-2 py-1 text-sm">
                    <option>Due Date</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500">
              <div>Task name</div>
              <div>Due on</div>
              <div>Task Status</div>
            </div>
          </div>

          {/* Todo Section */}
          <div className="flex flex-col gap-1 ">
            <div className="rounded-lg bg-pink-100 px-4 py-2">
              <h3 className="font-medium text-pink-900">Todo (3)</h3>
            </div>

            {showAddTask && (
              <div className="flex items-center space-x-4 rounded-lg border bg-gray-50 p-2">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="flex-1 rounded border px-3 py-1"
                />
                <div className="flex items-center space-x-2">
                  <button className="rounded bg-purple-600 px-3 py-1 text-sm text-white">
                    ADD
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="rounded px-3 py-1 text-sm text-gray-600"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowAddTask(true)}
              className="flex w-full items-center space-x-2 rounded-lg border p-2 text-gray-600 hover:bg-gray-50"
            >
              <span>+</span>
              <span>ADD TASK</span>
            </button>

            {/* Todo Items */}
            <TaskItem
              title="Interview with Design Team"
              date="Today"
              status="TO-DO"
            />
            <TaskItem title="Team Meeting" date="30 Dec, 2024" status="TO-DO" />
            <TaskItem
              title="Design a Dashboard page along with wireframes"
              date="31 Dec, 2024"
              status="TO-DO"
            />
          </div>

          {/* In Progress Section */}
          <div className="">
            <div className="rounded-lg bg-blue-100 px-4 py-2">
              <h3 className="font-medium text-blue-900">In-Progress (3)</h3>
            </div>
            <TaskItem
              title="Morning Workout"
              date="Today"
              status="IN-PROGRESS"
            />
            <TaskItem title="Code Review" date="Today" status="IN-PROGRESS" />
            <TaskItem
              title="Update Task Tracker"
              date="25 Dec, 2024"
              status="IN-PROGRESS"
            />
          </div>

          {/* Completed Section */}
          <div className="">
            <div className="rounded-lg bg-green-100 px-4 py-2">
              <h3 className="font-medium text-green-900">Completed (3)</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function TaskItem({ title, date, status }) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-2 text-sm">
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span>{title}</span>
        </div>
      </div>
      <div className="text-sm text-gray-500">{date}</div>
      <div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            status === "TO-DO"
              ? "bg-gray-100"
              : status === "IN-PROGRESS"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default Login;
