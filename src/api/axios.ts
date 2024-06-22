import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UTRIP_API_BASE_URL,
});

export default instance;
