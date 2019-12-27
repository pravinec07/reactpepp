import api from './api';
import apiRoutes from './apiRoutes';

export const signIn = data => api.post(apiRoutes.SIGN_IN, data);
export const signUp = data => api.post(apiRoutes.SIGN_UP, data);
export const sendOTP = data => api.post(apiRoutes.SEND_OTP, data);
export const resendOTP = data => api.post(apiRoutes.RESEND_OTP, data);
export const verifyOTP = data => api.post(apiRoutes.VERIFY_OTP, data);
