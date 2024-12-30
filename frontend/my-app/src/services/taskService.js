import { apiClient } from '../utils/apiClient';

export const taskService = {
  getTasks: async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await apiClient.get('/tasks/', token);
      return response.map((task) => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        project: task.project,
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    const token = localStorage.getItem('accessToken');
    try {
      const task = await apiClient.post('/tasks/', taskData, token);
      return {
        id: task.id,
        title: task.title,
        completed: task.completed,
        project: task.project,
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (taskId, taskData) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await apiClient.put(`/tasks/${taskId}/`, taskData, token);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    const token = localStorage.getItem('accessToken');
    try {
      await apiClient.delete(`/tasks/${taskId}/`, token);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};