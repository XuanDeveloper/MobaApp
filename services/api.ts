
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.117:6222/', 
  timeout: 10000,                   
});

export default api;
