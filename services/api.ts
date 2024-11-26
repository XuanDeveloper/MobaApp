
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://45.225.170.64:6222/', 
  timeout: 10000,                   
});

export default api;
