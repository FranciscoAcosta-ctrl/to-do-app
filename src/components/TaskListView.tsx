import React, { useState } from "react";
import { Task, TaskStatus } from "@/interface/task";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";

interface Props {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskListView: React.FC<Props> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<TaskStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AddTask onAddTask={onAddTask} />
      <TaskFilters filter={filter} setFilter={setFilter} />

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      {filteredTasks.length === 0 ? (
        <p className="text-sm text-gray-400">No hay tareas que coincidan.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              status={task.status}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskListView;
