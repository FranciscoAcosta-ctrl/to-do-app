import React, { useRef, useEffect, useState } from "react";
import { TaskStatus } from "@/interface/task";

interface TaskFiltersProps {
  filter: TaskStatus | "all";
  setFilter: React.Dispatch<React.SetStateAction<TaskStatus | "all">>;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, setFilter }) => {
  const [rectWidth, setRectWidth] = useState(0);
  const [rectTranslateX, setRectTranslateX] = useState(0);
  const buttonRefs = {
    all: useRef<HTMLButtonElement>(null),
    todo: useRef<HTMLButtonElement>(null),
    inProgress: useRef<HTMLButtonElement>(null),
    completed: useRef<HTMLButtonElement>(null),
  };
  useEffect(() => {
    const updateRectSize = () => {
      const selectedButton =
        buttonRefs[
          filter === "all"
            ? "all"
            : filter === TaskStatus.Todo
            ? "todo"
            : filter === TaskStatus.InProgress
            ? "inProgress"
            : "completed"
        ].current;
      if (selectedButton && buttonRefs.all.current) {
        // Agregamos la verificación de null
        const { width, left } = selectedButton.getBoundingClientRect();
        setRectWidth(width);
        setRectTranslateX(
          left - buttonRefs.all.current.getBoundingClientRect().left
        );
      }
    };

    updateRectSize();
    window.addEventListener("resize", updateRectSize);
    return () => window.removeEventListener("resize", updateRectSize);
  }, [filter]);

  const handleFilterChange = (newFilter: TaskStatus | "all") => {
    setFilter(newFilter);
  };

  return (
    <div className="relative inline-flex rounded-lg shadow-md overflow-hidden mt-4 mb-4">
      <div
        className="absolute h-full bg-blue-200 rounded-lg transition-transform duration-300 ease-in-out"
        style={{
          width: rectWidth,
          transform: `translateX(${rectTranslateX}px)`,
        }}
      ></div>
      <button
        ref={buttonRefs.all}
        onClick={() => handleFilterChange("all")}
        className={`relative z-10 px-3 py-2 text-sm font-medium ${
          filter === "all" ? "text-blue-600" : "text-gray-600"
        }`}
      >
        Todas
      </button>
      <button
        ref={buttonRefs.todo}
        onClick={() => handleFilterChange(TaskStatus.Todo)}
        className={`relative z-10 px-3 py-2 text-sm font-medium ${
          filter === TaskStatus.Todo ? "text-blue-600" : "text-gray-600"
        }`}
      >
        Por hacer
      </button>
      <button
        ref={buttonRefs.inProgress}
        onClick={() => handleFilterChange(TaskStatus.InProgress)}
        className={`relative z-10 px-3 py-2 text-sm font-medium ${
          filter === TaskStatus.InProgress ? "text-blue-600" : "text-gray-600"
        }`}
      >
        En curso
      </button>
      <button
        ref={buttonRefs.completed}
        onClick={() => handleFilterChange(TaskStatus.Completed)}
        className={`relative z-10 px-3 py-2 text-sm font-medium ${
          filter === TaskStatus.Completed ? "text-blue-600" : "text-gray-600"
        }`}
      >
        Completadas
      </button>
    </div>
  );
};

export default TaskFilters;
