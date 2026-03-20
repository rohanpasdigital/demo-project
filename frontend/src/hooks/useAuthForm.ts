import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

export const useAuthForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (name: string, username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(name, username, email, password);
      login(response.access_token, response.user);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(username, password);
      login(response.access_token, response.user);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loginUser, loading, error };
};
