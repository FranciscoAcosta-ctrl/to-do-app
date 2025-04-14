export enum TaskStatus {
  Todo = 'Por hacer',
  InProgress = 'En curso',
  Completed = 'Completada',
}

export interface Task {
  id: string; // Agregamos un ID único para cada tarea
  title: string;
  description?: string; // La descripción es opcional
  creationDate: Date;
  status: TaskStatus;
}

