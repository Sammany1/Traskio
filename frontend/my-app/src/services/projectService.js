import { apiClient } from '../utils/apiClient';

export const projectService = {
  getProjects: async () => {
    try {
      const response = await apiClient.get('/user/projects/');
      // Map response to include only name and title fields
      return response.map((project) => ({
        id: project.id,
        name: project.name,
        tasks: project.tasks.map((task) => ({
          id: task.id,
          title: task.title,
          completed: task.completed,
        })),
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  createProject: async (projectData) => {
    try {
      const response = await apiClient.post('/projects/', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },
  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.put(`/projects/${projectId}/`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },
  deleteProject: async (projectId) => {
    try {
      await apiClient.delete(`/projects/${projectId}/`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};