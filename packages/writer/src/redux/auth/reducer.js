import actions from './actions';

const initState = {
  idToken: null,
  loginLoading: null,
  loginError: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return { ...state, loginLoading: true, idToken: null, loginError: null };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loginUpLoading: false,
        idToken: action.token,
        loginUpError: null,
      };

    case actions.LOGIN_ERROR:
      return {
        ...initState,
        loginLoading: false,
        idToken: null,
        loginError: action.payload,
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
