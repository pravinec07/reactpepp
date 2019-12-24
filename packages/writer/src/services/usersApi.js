import api from './api';
import apiRoutes from './apiRoutes';

export const signIn = data => api.post(apiRoutes.SIGN_IN, data);
