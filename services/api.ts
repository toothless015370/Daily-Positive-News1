
import axios from 'axios';

const API_BASE_URL = 'https://daily-positive-news.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const newsService = {
  getAllNews: async () => {
    const response = await api.get('/news');
    return response.data;
  },
  getNewsById: async (id: string) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
  createNews: async (newsData: any) => {
    const response = await api.post('/news', newsData);
    return response.data;
  },
  updateNews: async (id: string, newsData: any) => {
    const response = await api.put(`/news/${id}`, newsData);
    return response.data;
  },
  deleteNews: async (id: string) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
  incrementView: async (id: string) => {
    const response = await api.post(`/news/${id}/view`);
    return response.data;
},
};

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  register: async (credentials: any) => {
    const response = await api.post('/register', credentials);
    return response.data;
  },
};

export default api;
