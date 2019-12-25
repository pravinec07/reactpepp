import actions from './actions';

const initState = { signUpLoading: null, signUpData: null, signUpError: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SIGNUP_REQUEST:
      console.log(state, 'reducer');
      return { ...state, signUpLoading: true, signUpError: null };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpData: action.payload,
        signUpError: null,
      };

    case actions.SIGNUP_ERROR:
      console.log(action.payload);
      return {
        ...initState,
        signUpLoading: false,
        signUpError: action.payload,
      };

    default:
      return state;
  }
}
