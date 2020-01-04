import api from './api';
import apiRoutes from './apiRoutes';

export const signIn = data => api.post(apiRoutes.SIGN_IN, data);
export const signUp = data => api.post(apiRoutes.SIGN_UP, data);
export const sendOTP = data => api.get(apiRoutes.SEND_OTP, data);
export const resendOTP = data => api.get(apiRoutes.RESEND_OTP, data);
export const verifyOTP = data => api.get(apiRoutes.VERIFY_OTP, data);
export const changePassword = data =>
  api.post(
    data.confirmationCode
      ? apiRoutes.CHANGE_PASSWORD
      : apiRoutes.CHANGE_PASSWORD_OTP,
    data
  );
export const updateProfile = data => api.post(apiRoutes.UPDATE_PROFILE, data);
