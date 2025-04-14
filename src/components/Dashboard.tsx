"use client";

import React, { useState } from "react";
import ScrumBoard from "./ScrumBoard";
import { Task } from "@/interface/task";
import { ClipboardDocumentListIcon, HomeIcon } from "@heroicons/react/16/solid";
import TaskListView from "./TaskListView";

interface DashboardProps {
  initialTasks: Task[];
  onUpdateTasks: (updatedTasks: Task[]) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  initialTasks,
  onUpdateTasks,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeSection, setActiveSection] = useState<
    "createNote" | "scrumBoard"
  >("createNote");

  const handleUpdateTask = (updatedTask: Task) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
    onUpdateTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    onUpdateTasks(updated);
  };

  const handleAddTask = (task: Task) => {
    const updated = [task, ...tasks];
    setTasks(updated);
    onUpdateTasks(updated);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 p-6 border-r border-neutral-800 flex flex-col justify-between">
        <nav className="space-y-2">
          <SidebarButton
            icon={HomeIcon}
            label="Crear Nota"
            active={activeSection === "createNote"}
            onClick={() => setActiveSection("createNote")}
          />
          <SidebarButton
            icon={ClipboardDocumentListIcon}
            label="Tablero"
            active={activeSection === "scrumBoard"}
            onClick={() => setActiveSection("scrumBoard")}
          />
        </nav>
        <footer className="text-sm text-neutral-500 pt-4">
          <p>© 2025 Francisco Acosta</p>
        </footer>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-neutral-950 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeSection === "createNote" && (
            <TaskListView
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
          {activeSection === "scrumBoard" && (
            <section className="mt-4">
              <ScrumBoard
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

interface SidebarButtonProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium
      ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
      }`}
  >
    <Icon className="h-5 w-5" />
    {label}
  </button>
);
