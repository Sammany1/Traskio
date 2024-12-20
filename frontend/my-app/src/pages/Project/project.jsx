'use client';
import React, { useState, useRef } from 'react';
import ProgressBar from '../../components/ui/ProgressBar';
import styles from './Project.module.css';
import { projectService } from '../../services/projectService';

const ProjectCard = ({ project, updateProject, handleDeleteProject }) => {
  const { id, title, isEditing, tasks: initialTasks } = project;
  const [tasks, setTasks] = useState(initialTasks || []);
  const inputRef = useRef();

  const handleAddTask = async () => {
    const text = inputRef.current.value;
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text, completed: false };
    const updatedTasks = [...tasks, newTask];
    try {
      await projectService.updateProject(id, { ...project, tasks: updatedTasks });
      setTasks(updatedTasks);
      inputRef.current.value = '';
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleToggleTask = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    try {
      await projectService.updateProject(id, { ...project, tasks: updatedTasks });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    try {
      await projectService.updateProject(id, { ...project, tasks: updatedTasks });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    try {
      await projectService.updateProject(id, { ...project, title: newTitle });
      updateProject(id, { title: newTitle });
    } catch (error) {
      console.error('Failed to update project title:', error);
    }
  };

  const handleTitleBlur = () => {
    updateProject(id, { isEditing: false });
  };

  return (
    <div className={styles.todoCard}>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          placeholder="Enter Project Title"
          className={styles.titleInput}
          autoFocus
        />
      ) : (
        <h2 onClick={() => updateProject(id, { isEditing: true })}>
          {title || 'Untitled Project'}
        </h2>
      )}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span
              className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}
            >
              {task.text}
            </span>
            <span
              className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
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
              style={{ background: 'none', width: '20px'}}
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
        <input
          ref={inputRef}
          placeholder="Add Task..."
          className={styles.input}
        />
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
