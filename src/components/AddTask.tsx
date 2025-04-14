import React, { useState } from "react";
import { Task, TaskStatus } from "@/interface/task";

interface AddTaskProps {
  onAddTask: (task: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("El título es obligatorio.");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      creationDate: new Date(),
      status: TaskStatus.Todo,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-white animate-fade-in"
    >
      <div>
        <label className="block text-sm font-semibold mb-1">
          Título de la tarea
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Escribir resumen de proyecto"
          className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Descripción (opcional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalles adicionales, links, recordatorios, etc."
          className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-medium py-3 rounded-lg"
      >
        Agregar Tarea
      </button>

      {success && (
        <p className="text-green-500 text-sm font-medium animate-pulse">
          ✅ Tarea agregada correctamente
        </p>
      )}
    </form>
  );
};

export default AddTask;
