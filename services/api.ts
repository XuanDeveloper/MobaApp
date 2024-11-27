import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.117:6222/',
  timeout: 10000,
});

export const getProductDetails = async (id: number) => {
  try {
    const response = await api.get(`/api/products/search/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export default api;

