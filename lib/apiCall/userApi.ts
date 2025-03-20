import apiClient from './apiClient';
import axios from 'axios';

const register = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post('/api/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userApi = {
  register,
};
