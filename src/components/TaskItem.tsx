import React, { useState } from "react";
import { Task, TaskStatus } from "@/interface/task";
import {
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import ConfirmationModal from "./ConfirmationModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  status: TaskStatus;
}

const statusToText = {
  [TaskStatus.Todo]: "Por hacer",
  [TaskStatus.InProgress]: "En curso",
  [TaskStatus.Completed]: "Completada",
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedTask({ ...editedTask, status: e.target.value as TaskStatus });
  };

  const handleUpdate = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <li
      className={`p-4 border rounded-xl shadow transition-all duration-300 ${
        isEditing ? "border-blue-400 bg-white" : "hover:shadow-lg bg-white"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-y-2">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
                placeholder="Título"
                className="w-full px-3 py-2 border rounded-md text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                value={editedTask.description || ""}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="w-full px-3 py-2 border rounded-md text-sm resize-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <select
                  value={editedTask.status}
                  onChange={handleStatusChange}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={TaskStatus.Todo}>Por hacer</option>
                  <option value={TaskStatus.InProgress}>En curso</option>
                  <option value={TaskStatus.Completed}>Completada</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-800">
                {task.title.toUpperCase()}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    task.status === TaskStatus.Completed
                      ? "bg-green-500"
                      : task.status === TaskStatus.InProgress
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                />
                <span>{statusToText[task.status]}</span>
              </div>
              {/* Fecha de creación */}
              <p className="text-xs text-gray-400">
                Creado el{" "}
                {format(new Date(task.creationDate), "PPPP 'a las' p", {
                  locale: es,
                })}
              </p>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-2 items-start md:items-center mt-2 md:mt-0">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
              title="Editar"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onDeleteTask(task.id);
          setIsModalOpen(false);
        }}
        message={`¿Seguro que quieres eliminar la tarea "${task.title}"?`}
      />
    </li>
  );
};

export default TaskItem;
