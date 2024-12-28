const API_BASE_URL = 'http://127.0.0.1:8000/';

export const apiClient = {
  get: async (endpoint, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },
  
  post: async (endpoint, data, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },

  put: async (endpoint, data, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },

  delete: async (endpoint, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // Only try to parse JSON if there's an error response with content
        const result = await response.json();
        throw new Error(result.error || 'Request failed');
      }
      // Don't try to parse the response for successful deletion (204)
      return response;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },
  
  login: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }
      // Store tokens in localStorage
      localStorage.setItem('accessToken', result.access);
      localStorage.setItem('refreshToken', result.refresh);
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'Invalid credentials. Please try again.');
    }
  },

  createUser: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },
};