"use client";

import React, { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "@/utils/localStorage";
import { Task } from "@/interface/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const stored = getTasksFromLocalStorage();
        setTasks(stored);
      } catch (err) {
        console.error("Error al cargar tareas:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleUpdateTasks = (updated: Task[]) => {
    try {
      saveTasksToLocalStorage(updated);
      setTasks(updated);
    } catch (err) {
      console.error("Error al guardar tareas:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-lg">
        <span className="animate-pulse">Cargando tareas...</span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Dashboard initialTasks={tasks} onUpdateTasks={handleUpdateTasks} />
    </div>
  );
}
