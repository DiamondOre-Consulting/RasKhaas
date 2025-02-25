import axios from 'axios';
// http://localhost:5000/api
const BASE_URL = "https://raskhaas-backend.onrender.com/api"
// https://raskhaas-backend.onrender.com/api
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true

export default axiosInstance