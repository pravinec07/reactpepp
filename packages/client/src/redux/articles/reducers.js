import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  articles: [],
  article: {
    key: null,
    id: new Date().getTime(),
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft', // publish
    description: '',
    created_at: new Date().getTime(),
    deleted_at: null, // soft delete
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.GET_ARTICLE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.GET_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: payload.data,
        errorMessage: false,
      };
    case actions.GET_ARTICLE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    default:
      return state;
  }
}
