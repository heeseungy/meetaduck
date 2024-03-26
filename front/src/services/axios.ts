import axios from 'axios';

export const Axios = axios.create({
  // baseURL: 'http://j10c108.p.ssafy.io:8080',
  baseURL: 'https://localhost:8080',
  withCredentials: true
});
