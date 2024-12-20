'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../Project/project';
import styles from './ToDosPage.module.css';
import { projectService } from '../../services/projectService';

const ToDoPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate('/login');
          return;
        }
        const projects = await projectService.getProjects();
        setProjects(projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setError(error.message);
        if (error.message.includes('401') || error.message.includes('unauthorized')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleAddProject = async () => {
    const newProject = { title: 'New Project', tasks: [] };
    try {
      const createdProject = await projectService.createProject(newProject);
      setProjects(prev => [...prev, createdProject]);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const updateProject = async (projectId, updatedData) => {
    try {
      const updatedProject = await projectService.updateProject(projectId, updatedData);
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? updatedProject : project
        )
      );
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await projectService.deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className={styles.todoPageContainer}>
      {loading && <div>Loading projects...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && (
        <>
          <div className={styles.projectContainer}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                updateProject={updateProject}
                handleDeleteProject={handleDeleteProject}
              />
            ))}
          </div>
          <button className={styles.floatingButton} onClick={handleAddProject}>
            +
          </button>
        </>
      )}
    </div>
  );
};

export default ToDoPage;
