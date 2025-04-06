export interface Task {
    id: string;
    text: string;
    completed: boolean;
    description?: string;
    createdAt: Date;
  }