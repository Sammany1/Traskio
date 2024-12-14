import { apiClient } from '../utils/apiClient';

export const projectCollaboratorService = {
  getProjectCollaborators: () => apiClient.get('/project-collaborators/'),
  createProjectCollaborator: (projectCollaboratorData) => apiClient.post('/project-collaborators/', projectCollaboratorData),
  updateProjectCollaborator: (projectCollaboratorId, projectCollaboratorData) => apiClient.put(`/project-collaborators/${projectCollaboratorId}/`, projectCollaboratorData),
  deleteProjectCollaborator: (projectCollaboratorId) => apiClient.delete(`/project-collaborators/${projectCollaboratorId}/`),
};
