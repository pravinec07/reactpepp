import Actions from './actions';

const INITIAL_DATA = {
  data: null,
  loading: true,
  error: null,
};
export default function signupReducer(state = INITIAL_DATA, action) {
  switch (action.type) {
    case Actions.FETCH_START:
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: null,
      };
    case Actions.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case Actions.FETCH_FAILURE:
      return {
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case Actions.SEND_OTP_START:
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: null,
      };
    case Actions.SEND_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case Actions.SEND_OTP_FAILURE:
      return {
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case Actions.RESEND_OTP_START:
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: null,
      };
    case Actions.RESEND_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case Actions.RESEND_OTP_FAILURE:
      return {
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case Actions.VERIFY_OTP_START:
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: null,
        isOtpSuccessful: false,
      };
    case Actions.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        isOtpSuccessful: true,
      };
    case Actions.VERIFY_OTP_FAILURE:
      return {
        data: action.payload,
        loading: false,
        error: action.payload,
        isOtpSuccessful: false,
      };
    default:
      return state;
  }
}
