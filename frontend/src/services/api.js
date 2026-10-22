import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (formData) => API.post('/api/auth/login', formData);
export const registerUser = (formData) => API.post('/api/auth/register', formData);

// Farm Management APIs
export const addFarm = (farmData) => API.post('/api/farms', farmData);
export const getFarmsByOwner = (email) => API.get(`/api/farms/owner/${email}`);

// Marketplace APIs
export const addCrop = (cropData) => API.post('/api/crops', cropData);
export const getAllCrops = () => API.get('/api/crops');
export const getCropsBySeller = (email) => API.get(`/api/crops/seller/${email}`);

// Advisory & Weather APIs
export const getWeather = (location) => API.get(`/api/advisory/weather/${location}`);
export const analyzeDisease = (data) => API.post('/api/advisory/disease-check', data);

export default API;