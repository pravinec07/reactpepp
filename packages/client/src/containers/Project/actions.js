const Actions = {
  FETCH_START: 'FETCH_PROJECT_SAVE_START',
  FETCH_SUCCESS: 'FETCH_PROJECT_SAVE_SUCCESS',
  FETCH_FAILURE: 'FETCH_PROJECT_SAVE_FAILURE',
  ARTICLE_FETCH_START: 'FETCH_ARTICLE_SAVE_START',
  ARTICLE_FETCH_SUCCESS: 'FETCH_ARTICLE_SAVE_SUCCESS',
  ARTICLE_FETCH_FAILURE: 'FETCH_ARTICLE_SAVE_FAILURE',

  projectSaveStart: (data, user) => ({
    type: Actions.FETCH_START,
    payload: data,
    username: user,
  }),
  projectSaveSuccess: (data, id) => ({
    type: Actions.FETCH_SUCCESS,
    payload: data,
    projectId: id,
  }),
  projectSaveFailure: error => ({
    type: Actions.FETCH_FAILURE,
    payload: error,
  }),
  articleSaveStart: (data, id) => ({
    type: Actions.ARTICLE_FETCH_START,
    payload: data,
    projectId: id,
  }),
  articleSaveSuccess: data => ({
    type: Actions.ARTICLE_FETCH_SUCCESS,
    payload: data,
  }),
  articleSaveFailure: error => ({
    type: Actions.ARTICLE_FETCH_FAILURE,
    payload: error,
  }),
};

export default Actions;
