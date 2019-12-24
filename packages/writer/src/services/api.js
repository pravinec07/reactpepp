/**
 * @description axios for fetching data via services
 */

import axios from 'axios';
import apiRoutes from './apiRoutes';

const api = axios.create({
  baseURL: apiRoutes.BASE_URL,
  timeout: 10000,
  headers: { 'Content-type': 'application/json', accept: 'application/json' },
});

export default api;
