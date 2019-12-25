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
    default:
      return state;
  }
}
