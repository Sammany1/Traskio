import { apiClient } from '../utils/apiClient';

export const taskEventService = {
  getTaskEvents: () => apiClient.get('/task-events/'),
  createTaskEvent: (taskEventData) => apiClient.post('/task-events/', taskEventData),
  updateTaskEvent: (taskEventId, taskEventData) => apiClient.put(`/task-events/${taskEventId}/`, taskEventData),
  deleteTaskEvent: (taskEventId) => apiClient.delete(`/task-events/${taskEventId}/`),
};
