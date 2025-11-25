import axios from 'axios';

const api = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/api',
  withCredentials: false
});

export const setAuthToken = (token) => {
  if (token) {
    // configura o header padrão para todas as requisições futuras
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete api.defaults.headers.common['Authorization']; // remove o token da memoria
    localStorage.removeItem('authToken');
  }
};

export const loadTokenFromStorage = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
  }
};

export const logout = () => {
  setAuthToken(null);
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete config.headers['Authorization'];
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // token expirado ou não autorizado
    if (error.response?.status === 401) {
      logout();
      if (!window.location.pathname.includes('/login')) {
         window.location.href = '/login';
      }
    }

    // erro do servidor
    if (error.response?.status === 500 && process.env.REACT_APP_ENVIRONMENT === 'development') {
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use((config) => {
    console.log(`[${config.method.toUpperCase()}] ${config.url}`);
    return config;
  });
}

export default api;