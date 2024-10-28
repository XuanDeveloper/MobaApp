// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6266', // URL da sua API local
  timeout: 10000,                   // tempo limite para as requisições (opcional)
});

export default api;
