'use client';
import React, { useState, useRef } from 'react';
import ProgressBar from '../../../components/ui/ProgressBar';
import '../../../styles/globals.css';
import styles from './project.module.css';

const ProjectCard = ({ project, updateProject, deleteProject }) => {
  const { id, name, isEditing, tasks: initialTasks } = project;
  const [tasks, setTasks] = useState(initialTasks || []);
  const inputRef = useRef();

  const handleAddTask = () => {
    const text = inputRef.current.value;
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      title: text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    inputRef.current.value = '';
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleProjectNameChange = (e) => {
    updateProject(id, { name: e.target.value });
  };

  const handleProjectNameBlur = () => {
    updateProject(id, { isEditing: false });
  };

  return (
    <div className="card todoCard">
      <div className={styles.cardHeader}>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleProjectNameChange}
            onBlur={handleProjectNameBlur}
            placeholder="Enter Project Name"
            className={styles.titleInput}
            autoFocus
          />
        ) : (
          <h2
            className="card-title"
            onClick={() => updateProject(id, { isEditing: true})}
          >
            {name || 'Untitled Project'}
          </h2>
        )}
        {!isEditing && (
          <button className={styles.deleteCardBtn} onClick={() => deleteProject(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.trashIcon}
              width="20"
              height="20"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3-9h8v10H9V10zm5-6V3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H5c-.55 0-1 .45-1 1s.45-1 1-1h1v13c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5h1c.55 0 1-.45 1-1s-.45-1-1-1h-4z" />
            </svg>
          </button>
        )}
      </div>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span
              className={`${styles.taskText} ${
                task.completed ? styles.completed : ''
              }`}
            >
              {task.title}
            </span>
            <span
              className={`${styles.checkbox} ${
                task.completed ? styles.checked : ''
              }`}
              onClick={() => handleToggleTask(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={styles.checkboxIcon}
              >
                <circle cx="12" cy="12" r="9" className={styles.checkboxCircle} />
                <path d="M10 15l-3-3 1.41-1.41L10 12.17l5.59-5.59L17 8l-7 7z" />
              </svg>
            </span>
            <button
              style={{ background: 'none', width: '20px' }}
              className={styles.deleteBtn}
              onClick={() => handleDeleteTask(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.trashIcon}
                width="20"
                height="20"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3-9h8v10H9V10zm5-6V3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H5c-.55 0-1 .45-1 1s.45-1 1-1h1v13c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5h1c.55 0 1-.45 1-1s-.45-1-1-1h-4z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.inputWrapper}>
        <input ref={inputRef} placeholder="Add Task..." className="input" />
        <button className={styles.todoBtn} onClick={handleAddTask}>
          +
        </button>
      </div>
      <ProgressBar
        progress={tasks.length ? (completedTasks / tasks.length) * 100 : 0}
      />
    </div>
  );
};

export default ProjectCard;