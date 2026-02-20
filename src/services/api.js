import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Request interceptor to add Telegram InitData to headers
api.interceptors.request.use((config) => {
    if (window.Telegram?.WebApp?.initData) {
        config.headers.Authorization = window.Telegram.WebApp.initData;
    } else {
        // For development/testing without Telegram (Mock)
        // You might want to remove this in prod or use a dev-only flag
        // config.headers.Authorization = "mock_init_data"; 
        console.warn('Telegram InitData not found. API requests might fail auth.');
    }
    return config;
});

export const syncGameData = async (gameData) => {
    try {
        const response = await api.post('/user/sync', { gameData });
        return response.data;
    } catch (error) {
        console.error('API Sync Error:', error);
        throw error;
    }
};

export default api;
