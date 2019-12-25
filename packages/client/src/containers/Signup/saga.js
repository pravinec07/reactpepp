// saga.js
import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import { signUp } from '../../services/usersApi';

function* fetchSignupDataEffect() {
  try {
    yield takeEvery(actions.FETCH_START, function*(payload) {
      let response = yield call(signUp, payload.payload);
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
                type: actions.FETCH_SUCCESS,
                token: response.data.accessToken,
                profile: response.data,
              });
              break;
            default:
              yield put({
                type: actions.FETCH_ERROR,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;
        case 500:
          yield put({ type: actions.FETCH_ERROR });
          break;
        default:
          yield put({ type: actions.FETCH_ERROR });
          break;
      }
    });
  } catch (error) {}
}
export default function* rootSaga() {
  yield all([fork(fetchSignupDataEffect)]);
}
