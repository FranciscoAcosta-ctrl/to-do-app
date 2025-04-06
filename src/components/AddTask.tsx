import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../styles/AddTask.module.css';
import { motion } from 'framer-motion';

interface AddTaskProps {
  onAddTask: (text: string, description?: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
    setTitleError(''); // Limpiar el error al escribir
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskDescription(event.target.value);
  };

  const handleToggleDescriptionInput = () => {
    setShowDescriptionInput(!showDescriptionInput);
    if (showDescriptionInput) {
      setNewTaskDescription('');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText, showDescriptionInput ? newTaskDescription.trim() : undefined);
      setNewTaskText('');
      setNewTaskDescription('');
      setShowDescriptionInput(false);
      setTitleError('');
    } else {
      setTitleError('El título de la tarea no puede estar vacío.');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={styles.addTaskContainer}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTaskText}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.addButton} aria-label="Agregar nueva tarea">
          Crear
        </button>
      </div>
      {titleError && <p className={styles.error}>{titleError}</p>}
      <button
        type="button"
        onClick={handleToggleDescriptionInput}
        className={styles.addDescriptionButton}
      >
        {showDescriptionInput ? 'Ocultar Descripción' : '+ Detalles'}
      </button>
      {showDescriptionInput && (
        <textarea
          placeholder="Descripción detallada (opcional)"
          value={newTaskDescription}
          onChange={handleDescriptionChange}
          className={styles.descriptionInput}
        />
      )}
    </motion.form>
  );
};

export default AddTask;