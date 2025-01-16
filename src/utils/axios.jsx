import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/',  // Set your backend base URL
  withCredentials: true,              // Include credentials (e.g., cookies, JWT tokens)
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Replace with your token storage logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
