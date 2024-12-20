import { apiClient } from '../utils/apiClient';

export const projectService = {
  getProjects: () => apiClient.get('/user/projects/'),
  createProject: (projectData) => apiClient.post('/user/projects/', projectData),
  updateProject: (projectId, projectData) => apiClient.put(`/user/projects/${projectId}/`, projectData),
  deleteProject: (projectId) => apiClient.delete(`/user/projects/${projectId}/`),
};
