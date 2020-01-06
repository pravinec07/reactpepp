/**
 * @description axios for fetching data via services
 */

import axios from 'axios';
import apiRoutes from './apiRoutes';

const token = localStorage.getItem('id_token');
const accessToken = token
  ? JSON.parse(Buffer.from(token, 'base64').toString('ascii')).accessToken
  : false;
console.log('accessToken', accessToken);
const api = axios.create({
  baseURL: apiRoutes.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-type': 'application/json',
    accept: 'application/json',
    Authorization: accessToken ? `Pepper ${accessToken}` : false,
  },
});

export default api;
