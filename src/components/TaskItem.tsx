import React, { useState } from 'react';
import { Task } from '@/interface/task';
import styles from '../styles/TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDeleteTask }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionToShow = showFullDescription ? task.description : task.description?.substring(0, 50) + (task.description && task.description?.length > 50 ? '...' : '');

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const formattedDate = new Date(task.createdAt).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return (
    <li key={task.id} className={styles.taskItem}>
      <div className={styles.taskHeader}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className={styles.checkbox}
        />
        <span
          className={styles.taskText}
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
          {task.text}
        </span>
        <span className={styles.createdAt}>{formattedDate}</span>
      </div>
      {task.description && (
        <div className={styles.taskDescriptionContainer}>
          <span
            className={
              showFullDescription ? styles.taskDescriptionFull : styles.taskDescriptionShort
            }
            onClick={handleToggleDescription}
            style={{ cursor: 'pointer' }}
          >
            ({descriptionToShow})
          </span>
        </div>
      )}
      <button onClick={() => onDeleteTask(task.id)} className={styles.deleteButton}>
        Eliminar
      </button>
    </li>
  );
};

export default TaskItem;