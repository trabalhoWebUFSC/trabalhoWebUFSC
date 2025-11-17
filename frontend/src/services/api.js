import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com'
})

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization']; // remove o token da memoria
  }
}

export default api;
