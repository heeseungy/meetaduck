import axios from 'axios';

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json;charset=utf-8',
  //   'Access-Control-Allow-Origin': '*'
  // },
});
