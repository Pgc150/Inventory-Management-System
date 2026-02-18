import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true,               
});

export default axiosInstance;

export const productInstance = axios.create({
   baseURL:"http://localhost:5000/api",
   withCredentials: true,
})
