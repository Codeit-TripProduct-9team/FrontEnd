import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UTRIP_API_BASE_URL,
});

export const adminInstance = axios.create({
  baseURL: 'https://utriptest.shop/admin',
});

export default instance;
