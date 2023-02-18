import axios from 'axios';

const config = {
  baseURL: 'https://eps32444.gabia.io/api',
  // baseURL: 'http://localhost:8080/api',
  timeout: 10000,
};
const http = axios.create(config);

export default http;
