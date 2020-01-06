import Actions from './actions';

const INITIAL_DATA = {
  data: null,
  loading: true,
  error: null,
  isOtpSuccessful: 'notStarted',
  verifyLoading: true,
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
        isOtpSuccessful: 'notStarted',
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
        ...state,
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
        ...state,
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case Actions.VERIFY_OTP_START:
      return {
        ...state,
        loading: true,
        error: null,
        isOtpSuccessful: 'started',
        verifyLoading: true,
      };
    case Actions.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        isOtpSuccessful: true,
        verifyLoading: false,
      };
    case Actions.VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isOtpSuccessful: false,
        verifyLoading: false,
      };
    default:
      return state;
  }
}
