const actions = {
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
  SEND_OTP_START: 'SEND_OTP_START',
  SEND_OTP_SUCCESS: 'SEND_OTP_SUCCESS',
  SEND_OTP_FAILURE: 'SEND_OTP_FAILURE',
  VERIFY_OTP_START: 'VERIFY_OTP_START',
  VERIFY_OTP_SUCCESS: 'VERIFY_OTP_SUCCESS',
  VERIFY_OTP_FAILURE: 'VERIFY_OTP_FAILURE',
  RESEND_OTP_START: 'RESEND_OTP_START',
  RESEND_OTP_SUCCESS: 'RESEND_OTP_SUCCESS',
  RESEND_OTP_FAILURE: 'RESEND_OTP_FAILURE',
  CHANGE_PASSWORD_START: 'CHANGE_PASSWORD_START',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE',
  UPDATE_PROFILE_START: 'UPDATE_PROFILE_START',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  GET_PROFILE_START: 'GET_PROFILE_START',
  GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILURE: 'GET_PROFILE_FAILURE',
  signUpRequest: payload => {
    console.log(payload, 'actions');
    return {
      type: actions.SIGNUP_REQUEST,
      payload,
    };
  },
  sendOTPStart: data => ({
    type: actions.SEND_OTP_START,
    payload: data,
  }),
  sendOTPSuccess: data => ({
    type: actions.SEND_OTP_SUCCESS,
    payload: data,
  }),
  sendOTPFailure: data => ({
    type: actions.SEND_OTP_FAILURE,
    payload: data,
  }),
  verifyOTPStart: data => ({
    type: actions.VERIFY_OTP_START,
    payload: data,
  }),
  verifyOTPSuccess: data => ({
    type: actions.VERIFY_OTP_SUCCESS,
    payload: data,
  }),
  verifyOTPFailure: data => ({
    type: actions.VERIFY_OTP_FAILURE,
    payload: data,
  }),
  resendOTPStart: data => ({
    type: actions.RESEND_OTP_START,
    payload: data,
  }),
  resendOTPSuccess: data => ({
    type: actions.RESEND_OTP_SUCCESS,
    payload: data,
  }),
  resendOTPFailure: data => ({
    type: actions.RESEND_OTP_FAILURE,
    payload: data,
  }),
  changePasswordStart: data => ({
    type: actions.CHANGE_PASSWORD_START,
    payload: data,
  }),
  changePasswordSuccess: data => ({
    type: actions.CHANGE_PASSWORD_SUCCESS,
    payload: data,
  }),
  changePasswordFailure: data => ({
    type: actions.CHANGE_PASSWORD_FAILURE,
    payload: data,
  }),
  updateProfileStart: data => ({
    type: actions.UPDATE_PROFILE_START,
    payload: data,
  }),
  updateProfileSuccess: data => ({
    type: actions.UPDATE_PROFILE_SUCCESS,
    payload: data,
  }),
  updateProfileFailure: data => ({
    type: actions.UPDATE_PROFILE_FAILURE,
    payload: data,
  }),
  getProfileStart: data => ({
    type: actions.GET_PROFILE_START,
    payload: data,
  }),
  getProfileSuccess: data => ({
    type: actions.GET_PROFILE_SUCCESS,
    payload: data,
  }),
  getProfileFailure: data => ({
    type: actions.GET_PROFILE_FAILURE,
    payload: data,
  }),
};
export default actions;
