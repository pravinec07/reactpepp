const actions = {
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
  signUpRequest: payload => {
    console.log(payload, 'actions');
    return {
      type: actions.SIGNUP_REQUEST,
      payload,
    };
  },
};
export default actions;
