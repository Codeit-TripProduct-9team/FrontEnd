import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UTRIP_API_BASE_URL,
});

export const adminInstance = axios.create({
  baseURL: 'https://utriptest.shop/admin',
});

// const getToken = () => {
//   if (typeof window !== undefined) {
//     const token = window.localStorage.getItem('accessToken');
//     return token;
//   }
//   return '';
// };

// instance.interceptors.request.use((config) => {
//   const modifiedConfig = { ...config };
//   modifiedConfig.headers.Authorization = `Bearer ${getToken()}`;
//   return modifiedConfig;
// });
