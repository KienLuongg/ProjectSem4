import axios from 'axios';
import { getCookie } from '../utils/storage/cookie-storage';
import { Storage } from '../contstants/storage';

const baseURL = 'http://14.248.97.203:4869';

const mainAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// mainAxios.interceptors.request.use(
//   (config) => {
//     const token = getCookie(Storage.token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default mainAxios;
