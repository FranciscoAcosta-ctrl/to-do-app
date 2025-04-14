// utils/localStorage.ts

import { Task } from '@/interface/task';

const STORAGE_KEY = 'tasks';

export const getTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== 'undefined') { // Verificación del lado del cliente
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }
  return []; // Devuelve un array vacío si no está en el cliente
};

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  if (typeof window !== 'undefined') { // Verificación del lado del cliente
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};