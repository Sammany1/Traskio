import { apiClient } from '../utils/apiClient';

export const userService = {
  getUsers: () => apiClient.get('/users/'),
  createUser: (userData) => apiClient.post('/users/', userData),
  deleteUser: (userId) => apiClient.delete(`/users/${userId}/`),
  login: (credentials) => apiClient.login(credentials),
  signup: (userData) => apiClient.createUser(userData),

  getUserData: async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await apiClient.get('/user/me/', token);
      return {
        id: response.id,
        username: response.username,
        email: response.email,
        profile_picture: response.profile_picture,
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  updateUser: async (userData) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await apiClient.put('/user/me/', userData, token);
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  updatePassword: async (oldPassword, newPassword) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await apiClient.put('/user/me/password/', { oldPassword, newPassword }, token);
      return response;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },
};