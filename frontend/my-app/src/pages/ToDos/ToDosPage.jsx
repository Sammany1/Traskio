'use client';
import React, { useState } from 'react';
import ProjectCard from '../Project/project';
import styles from './ToDosPage.module.css';

const ToDoPage = () => {
  const [projects, setProjects] = useState([]);

  const handleAddProject = () => {
    const newProject = { id: Date.now(), title: '', isEditing: true };
    setProjects([...projects, newProject]);
  };

  const updateProject = (projectId, updatedData) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, ...updatedData } : project
      )
    );
  };

  return (
    <div className={styles.todoPage}>
      <div className={styles.projectContainer}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            updateProject={updateProject}
          />
        ))}
      </div>
      <button className={styles.floatingButton} onClick={handleAddProject}>
        +
      </button>
    </div>
  );
};

export default ToDoPage;
