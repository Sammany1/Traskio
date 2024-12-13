import { apiClient } from '../utils/apiClient';

export const userService = {
  getUsers: () => apiClient.get('/users/'),
  createUser: (userData) => apiClient.post('/users/', userData),
  updateUser: (userId, userData) => apiClient.put(`/users/${userId}/`, userData),
  deleteUser: (userId) => apiClient.delete(`/users/${userId}/`),
};
