import { useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';

export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiClient.get(endpoint);
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};