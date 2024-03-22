import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'http://j10c108.p.ssafy.io:8080',
  // baseURL: 'http://localhost:8080',
});
