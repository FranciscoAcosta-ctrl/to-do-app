import React, { useState } from 'react';
import { Task } from '@/interface/task';
import styles from '../styles/TaskItem.module.css';
import { motion } from 'framer-motion';

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
    <motion.li
      key={task.id}
      className={styles.taskItem}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.taskHeader}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className={styles.checkbox}
        />
        <span
          className={styles.taskText}
          style={{ textDecoration: task.completed ? 'line-through' : 'none', transition: 'color 0.3s ease', color: task.completed ? '#888' : 'inherit' }}
        >
          {task.text}
        </span>
        <span className={styles.createdAt}>{formattedDate}</span>
      </div>
      {task.description && (
        <div className={styles.taskDescriptionContainer}>
          <motion.span
            className={
              showFullDescription ? styles.taskDescriptionFull : styles.taskDescriptionShort
            }
            onClick={handleToggleDescription}
            style={{ cursor: 'pointer' }}
            animate={{ opacity: showFullDescription ? 1 : 0.7 }}
            transition={{ duration: 0.2 }}
          >
            ({descriptionToShow})
          </motion.span>
        </div>
      )}
      <button onClick={() => onDeleteTask(task.id)} className={styles.deleteButton}>
        Eliminar
      </button>
    </motion.li>
  );
};

export default TaskItem;