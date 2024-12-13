const API_BASE_URL = 'http://127.0.0.1:8000/';

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  login: async (data) => {
    try {
      console.log('Sending login request to:', `${API_BASE_URL}login/`);
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
      return result;
    } catch (error) {
      console.error('Login fetch error:', error);
      throw error;
    }
  },

  createUser: async (data) => {
    try {
      console.log('Sending signup request to:', `${API_BASE_URL}signup/`);
      const response = await fetch(`${API_BASE_URL}signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Signup response:', result); 
      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }
      return result;
    } catch (error) {
      console.error('Signup fetch error:', error);
      throw error;
    }
  },
};