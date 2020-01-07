export default {
  BASE_URL:
    'https://lq7nixu4dh.execute-api.ap-south-1.amazonaws.com/development/',
  SIGN_IN: 'user/auth',
  SIGN_UP: 'user/auth/SignUp',
  SEND_OTP: 'user/auth/sendOtp',
  RESEND_OTP: 'user/auth/resendOtp',
  VERIFY_OTP: 'user/auth/verifyOtp',
  CHANGE_PASSWORD_OTP: 'user/auth/ResetPassword',
  CHANGE_PASSWORD: 'user/auth/ConfirmResetPassword',
  UPDATE_PROFILE: 'user/auth/updateUser',
  GET_PROFILE: 'user/auth/getUserData',
};
