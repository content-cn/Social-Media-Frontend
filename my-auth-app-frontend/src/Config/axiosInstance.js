// axiosInstance.js

import axios from 'axios';

// Create a new instance of Axios with default configuration
const axiosInstance = axios.create({
  baseURL: 'https://social-media-backend-umhi.onrender.com/api', // Replace this with your backend URL
  timeout: 10000, // Adjust timeout as needed
  // You can also add other default configurations here
});

export default axiosInstance;
