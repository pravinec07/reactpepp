import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import actions from './actions';
import { signUp } from '../../services/usersApi';
import SignUpRequestModel from '../../models/signUp';
export function* signUpRequest() {
  yield takeEvery('SIGNUP_REQUEST', function*({ payload }) {
    console.log(payload, 'saga');
    const payloadData = new SignUpRequestModel(payload);
    console.log(payload, payloadData, '-------->');

    try {
      const response = yield call(signUp, payloadData);
      console.log(response, payload, payloadData, '-------->');
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          console.log(status, '---->');
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.SIGNUP_SUCCESS,
                token: response.data.accessToken,
                profile: response.data,
              });
              break;
            default:
              yield put({
                type: actions.SIGNUP_ERROR,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;
        case 500:
          yield put({ type: actions.SIGNUP_ERROR });
          break;
        default:
          yield put({ type: actions.SIGNUP_ERROR });
          break;
      }
    } catch (e) {
      yield put({ type: actions.SIGNUP_ERROR, payload: e });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(signUpRequest)]);
}
