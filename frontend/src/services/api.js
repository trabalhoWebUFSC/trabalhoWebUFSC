import axios from 'axios';

/**
 * Instância do axios com configurações para a aplicação
 * BaseURL vem de variável de ambiente, com fallback para desenvolvimento local
 */
const api = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/api',
  withCredentials: true // envia cookies automaticamente
});

/**
 * Define o token JWT no header Authorization
 * Armazena também em localStorage para persistência entre sessões
 * @param {string} token - Token JWT recebido do servidor
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete api.defaults.headers.common['Authorization']; // remove o token da memoria
    localStorage.removeItem('authToken');
  }
};

/**
 * Carrega token salvo no localStorage ao iniciar a aplicação
 * Restaura a autenticação automaticamente se o usuário tiver feito login antes
 */
export const loadTokenFromStorage = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
  }
};

/**
 * Faz logout do usuário
 * Limpa token do header e do localStorage
 */
export const logout = () => {
  setAuthToken(null);
};

/**
 * Interceptor de resposta para tratamento de erros
 * - Redireciona para login se token expirar (401)
 * - Loga erros do servidor (500)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expirado ou não autorizado
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }

    // Erro do servidor
    if (error.response?.status === 500 && process.env.REACT_APP_ENVIRONMENT === 'development') {
      console.error('Erro no servidor:', error.response.data);
    }

    return Promise.reject(error);
  }
);

/**
 * Interceptor de requisição para logs em desenvolvimento
 * Mostra método HTTP e URL da requisição
 */
if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  api.interceptors.request.use((config) => {
    console.log(`[${config.method.toUpperCase()}] ${config.url}`);
    return config;
  });
}

export default api;
