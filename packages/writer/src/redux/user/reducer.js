import actions from './actions';

const initState = {
  signUpLoading: null,
  signUpData: null,
  signUpError: null,
  isOtpSuccessful: 'notStarted',
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
        data: action.payload,
        loading: true,
        error: null,
      };
    case actions.SEND_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case actions.SEND_OTP_FAILURE:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case actions.RESEND_OTP_START:
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: null,
      };
    case actions.RESEND_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case actions.RESEND_OTP_FAILURE:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case actions.VERIFY_OTP_START:
      return {
        ...state,
        loading: true,
        error: null,
        isOtpSuccessful: 'started',
      };
    case actions.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        isOtpSuccessful: true,
      };
    case actions.VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isOtpSuccessful: false,
      };
    default:
      return state;
  }
}
