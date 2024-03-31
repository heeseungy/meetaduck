import axios from 'axios';

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: '*',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${sessionStorage.getItem('JWT') !== null ? sessionStorage.getItem('JWT') : ''}`,
  },
});

export const LoginAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: '*',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
});
