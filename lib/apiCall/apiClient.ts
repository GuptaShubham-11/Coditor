import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 🔹 Use a request interceptor to fetch the session dynamically
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // Fetch session on each request

    if (!session) {
      signOut(); // Logout immediately if no session
      throw new axios.Cancel('Unauthorized: Redirecting to login...');
    }

    config.headers.Authorization = `Bearer ${session.user.id}`; // Use user ID as token (or modify as needed)
    return config;
  },
  (error) => Promise.reject(error),
);

// 🔹 Handle unauthorized responses globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      signOut(); // Logout if 401 occurs
    }
    return Promise.reject(error);
  },
);

export default apiClient;
