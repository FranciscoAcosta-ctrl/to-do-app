import React from 'react';
import ScrumColumn from './ScrumColumn';
import { Task, TaskStatus } from '@/interface/task';

interface ScrumBoardProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (id: string) => void;
}

const ScrumBoard: React.FC<ScrumBoardProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const todoTasks = tasks.filter((task) => task.status === TaskStatus.Todo);
  const inProgressTasks = tasks.filter((task) => task.status === TaskStatus.InProgress);
  const completedTasks = tasks.filter((task) => task.status === TaskStatus.Completed);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ScrumColumn
        title="Por hacer"
        status={TaskStatus.Todo}
        tasks={todoTasks}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
      <ScrumColumn
        title="En curso"
        status={TaskStatus.InProgress}
        tasks={inProgressTasks}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
      <ScrumColumn
        title="Completada"
        status={TaskStatus.Completed}
        tasks={completedTasks}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
};

export default ScrumBoard;