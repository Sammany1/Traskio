import { apiClient } from '../utils/apiClient';

export const taskService = {
  getTasks: () => apiClient.get('/tasks/'),
  createTask: (taskData) => apiClient.post('/tasks/', taskData),
  updateTask: (taskId, taskData) => apiClient.put(`/tasks/${taskId}/`, taskData),
  deleteTask: (taskId) => apiClient.delete(`/tasks/${taskId}/`),
};
