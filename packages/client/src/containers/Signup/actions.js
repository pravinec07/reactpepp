const Actions = {
  FETCH_START: 'FETCH_SIGN_UP_SAVE_START',
  FETCH_SUCCESS: 'FETCH_SIGN_UP_SAVE_SUCCESS',
  FETCH_FAILURE: 'FETCH_SIGN_UP_SAVE_FAILURE',
  fetchSignUpSaveStart: data => ({
    type: Actions.FETCH_START,
    payload: data,
  }),
  fetchSignUpSaveSuccess: data => ({
    type: Actions.FETCH_SUCCESS,
    payload: data,
  }),
  fetchSignUpSaveFailure: error => ({
    type: Actions.FETCH_FAILURE,
    payload: error,
  }),
};

export default Actions;
