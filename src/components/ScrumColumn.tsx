import React from "react";
import { Task, TaskStatus } from "@/interface/task";
import TaskItem from "./TaskItem";

interface ScrumColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (id: string) => void;
}

const ScrumColumn: React.FC<ScrumColumnProps> = ({
  title,
  tasks,
  onUpdateTask,
  onDeleteTask,
  status, // Agregar la prop status
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md min-h-[400px]">
      <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            status={status}
          />
        ))}
      </ul>
    </div>
  );
};

export default ScrumColumn;
