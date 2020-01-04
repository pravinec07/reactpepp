import actions from './actions';

const initState = {
  signUpLoading: null,
  signUpData: null,
  signUpError: null,
  sendOtpLoading: null,
  sendOtpResponse: null,
  sendOtpError: null,
  verifyOtpLoading: null,
  verifyOtpResponse: null,
  verifyOtpError: null,
  changePasswordLoading: null,
  changePasswordResponse: null,
  changePasswordError: null,
  updateProfileLoading: null,
  updateProfileResponse: null,
  updateProfileError: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SIGNUP_REQUEST:
      return { ...state, signUpLoading: true, signUpError: null };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpData: action.payload,
        signUpError: null,
      };

    case actions.SIGNUP_ERROR:
      return {
        ...initState,
        signUpLoading: false,
        signUpError: action.payload,
      };
    case actions.SEND_OTP_START:
      return {
        ...state,
        sendOtpResponse: null,
        sendOtpLoading: true,
        sendOtpError: null,
      };
    case actions.SEND_OTP_SUCCESS:
      return {
        ...state,
        sendOtpResponse: action.payload,
        sendOtpLoading: false,
        sendOtpError: null,
      };
    case actions.SEND_OTP_FAILURE:
      return {
        ...state,
        sendOtpResponse: action.payload,
        sendOtpLoading: false,
        sendOtpError: action.payload,
      };
    case actions.VERIFY_OTP_START:
      return {
        ...state,
        verifyOtpResponse: null,
        verifyOtpLoading: true,
        verifyOtpError: null,
      };
    case actions.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpResponse: action.payload,
        verifyOtpLoading: false,
        verifyOtpError: null,
      };
    case actions.VERIFY_OTP_FAILURE:
      return {
        ...state,
        verifyOtpResponse: null,
        verifyOtpLoading: false,
        verifyOtpError: action.payload,
      };
    case actions.CHANGE_PASSWORD_START:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordResponse: null,
        changePasswordError: null,
      };
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordResponse: action.payload,
        changePasswordError: null,
      };

    case actions.CHANGE_PASSWORD_FAILURE:
      return {
        ...initState,
        changePasswordLoading: false,
        changePasswordError: action.payload,
      };
    case actions.UPDATE_PROFILE_START:
      return {
        ...state,
        updateProfileLoading: true,
        updateProfileResponse: null,
        updateProfileError: null,
      };
    case actions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileResponse: action.payload,
        updateProfileError: null,
      };

    case actions.UPDATE_PROFILE_FAILURE:
      return {
        ...initState,
        updateProfileLoading: false,
        updateProfileError: action.payload,
      };
    default:
      return state;
  }
}
