import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
  params: {
    api_key: apiKey,
    language: 'en-US',
  },
});

export default api;
