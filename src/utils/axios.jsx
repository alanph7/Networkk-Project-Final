import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/',  // Set your backend base URL
  withCredentials: true,              // Include credentials (e.g., cookies, JWT tokens)
  timeout: 10000, // 10 seconds
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Replace with your token storage logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/seller-auth';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
