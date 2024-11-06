// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.117:6222/', // URL da sua API local
  timeout: 10000,                   // tempo limite para as requisições (opcional)
});

export default api;
