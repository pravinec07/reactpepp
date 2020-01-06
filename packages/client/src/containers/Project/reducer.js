import Actions from './actions';

const INITIAL_DATA = {
  data: null,
  loading: true,
  error: null,
  projectId: null,
  articleSuccessful: false,
};

export default function projectReducer(state = INITIAL_DATA, action) {
  console.log('action is', action);
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
        projectId: action.payload.id,
        //projectId: ""
      };
    case Actions.FETCH_FAILURE:
      return {
        data: action.payload,
        loading: false,
        error: action.payload,
      };
    case Actions.ARTICLE_FETCH_START:
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: null,
      };
    case Actions.ARTICLE_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        articleSuccessful: true,
      };
    case Actions.ARTICLE_FETCH_FAILURE:
      return {
        data: action.payload,
        loading: false,
        error: action.payload,
        articleSuccessful: false,
      };
    default:
      return state;
  }
}
