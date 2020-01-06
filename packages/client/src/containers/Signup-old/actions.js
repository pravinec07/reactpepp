const Actions = {
  FETCH_START: 'FETCH_SIGN_UP_SAVE_START',
  FETCH_SUCCESS: 'FETCH_SIGN_UP_SAVE_SUCCESS',
  FETCH_FAILURE: 'FETCH_SIGN_UP_SAVE_FAILURE',
  SEND_OTP_START: 'SEND_OTP_START',
  SEND_OTP_SUCCESS: 'SEND_OTP_SUCCESS',
  SEND_OTP_FAILURE: 'SEND_OTP_FAILURE',
  VERIFY_OTP_START: 'VERIFY_OTP_START',
  VERIFY_OTP_SUCCESS: 'VERIFY_OTP_SUCCESS',
  VERIFY_OTP_FAILURE: 'VERIFY_OTP_FAILURE',
  RESEND_OTP_START: 'RESEND_OTP_START',
  RESEND_OTP_SUCCESS: 'RESEND_OTP_SUCCESS',
  RESEND_OTP_FAILURE: 'RESEND_OTP_FAILURE',
  fetchSignUpSaveStart: data => ({
    type: Actions.FETCH_START,
    payload: data,
  }),
  fetchSignUpSaveSuccess: data => ({
    type: Actions.FETCH_SUCCESS,
    payload: data,
  }),
  fetchSignUpSaveFailure: error => ({
    type: Actions.FETCH_FAILURE,
    payload: error,
  }),
  sendOTPStart: data => ({
    type: Actions.SEND_OTP_START,
    payload: data,
  }),
  sendOTPSuccess: data => ({
    type: Actions.SEND_OTP_SUCCESS,
    payload: data,
  }),
  sendOTPFailure: data => ({
    type: Actions.SEND_OTP_FAILURE,
    payload: data,
  }),
  verifyOTPStart: data => ({
    type: Actions.VERIFY_OTP_START,
    payload: data,
  }),
  verifyOTPSuccess: data => ({
    type: Actions.VERIFY_OTP_SUCCESS,
    payload: data,
  }),
  verifyOTPFailure: data => ({
    type: Actions.VERIFY_OTP_FAILURE,
    payload: data,
  }),
  resendOTPStart: data => ({
    type: Actions.RESEND_OTP_START,
    payload: data,
  }),
  resendOTPSuccess: data => ({
    type: Actions.RESEND_OTP_SUCCESS,
    payload: data,
  }),
  resendOTPFailure: data => ({
    type: Actions.RESEND_OTP_FAILURE,
    payload: data,
  }),
};

export default Actions;
