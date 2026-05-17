import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const api = axios.create({ baseURL: API_BASE, timeout: 30000 });
export const disclaimer = 'This is not financial advice.';
