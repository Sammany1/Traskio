'use client';
import React, { useState, useEffect, useContext } from 'react';
import ProjectCard from './Project/project';
import '../../../styles/globals.css';
import styles from './ToDosPage.module.css';
import { projectService } from '../../../services/projectService';
import { FilterContext } from '../../../context/FilterContext';

const ToDoPage = () => {
  const [projects, setProjects] = useState([]);
  const { filter } = useContext(FilterContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    const newProject = { id: null, name: 'Untitled Project', isEditing: true, finished: false, tasks: [] };
    try {
      const createdProject = await projectService.createProject(newProject);
      setProjects([...projects, createdProject]);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const updateProject = async (projectId, updatedData) => {
    try {
      await projectService.updateProject(projectId, updatedData);
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? { ...project, ...updatedData } : project
        )
      );
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await projectService.deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    if (filter === 'Finished') return project.finished;
    if (filter === 'Unfinished') return !project.finished;
    return true;
  });

  return (
    <div className="container">
      <div className={styles.projectContainer}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            updateProject={updateProject}
            deleteProject={deleteProject}
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