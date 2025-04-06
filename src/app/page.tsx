"use client";

import type { NextPage } from 'next';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/interface/task';
import AddTask from '@/components/AddTask';
import TaskItem from '@/components/TaskItem';
import ConfirmationModal from '@/components/ConfirmationModal';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleAddTask = (text: string, description?: string) => {
    const newTask: Task = {
      id: uuidv4(),
      text,
      completed: false,
      description,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      setTasks(updatedTasks);
      setTaskToDelete(null);
    }
    setIsConfirmationModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className={styles.container}>
      <h1>Mi Lista de Tareas</h1>
      <AddTask onAddTask={handleAddTask} />
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteClick}
          />
        ))}
      </ul>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que deseas eliminar esta tarea?"
      />
    </div>
  );
};

export default Home;