'use client';
import React, { useState, useRef } from 'react';
import ProgressBar from '../../components/ui/ProgressBar';
import Button from '../../components/ui/Button';
import styles from './Project.module.css';

const ProjectCard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef();

  const handleAddTask = () => {
    const text = inputRef.current.value;
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    inputRef.current.value = '';
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className={styles.card}>
      <h2>Project {projectId}</h2>
      <ul className={styles.taskList}>
        {tasks.map((item) => (
          <li key={item.id} className={styles.taskItem}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleTask(item.id)}
              className={styles.checkbox}
            />
            <span className={styles.taskText}>{item.text}</span>
            <button className={styles.deleteBtn} onClick={() => handleDeleteTask(item.id)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={styles.trashIcon}
                    width="16" height="16"
                >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3-9h8v10H9V10zm5-6V3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H5c-.55 0-1 .45-1 1s.45 1 1 1h1v13c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5h1c.55 0 1-.45 1-1s-.45-1-1-1h-4z" />
                </svg>
                Delete
            </button>

          </li>
        ))}
      </ul>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          placeholder="Add Task..."
          className={styles.input}
        />
        <button className={styles.btn} onClick={handleAddTask}>
          +
        </button>
      </div>
      <ProgressBar
        progress={(tasks.length ? (completedTasks / tasks.length) * 100 : 0)}
      />
    </div>
  );
};

export default ProjectCard;
