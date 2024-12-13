import { apiClient } from '../utils/apiClient';

export const projectService = {
  getProjects: () => apiClient.get('/projects/'),
  createProject: (projectData) => apiClient.post('/projects/', projectData),
  updateProject: (projectId, projectData) => apiClient.put(`/projects/${projectId}/`, projectData),
  deleteProject: (projectId) => apiClient.delete(`/projects/${projectId}/`),
};
