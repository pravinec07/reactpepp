import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';
import { getToken, clearToken } from '@iso/lib/helpers/utility';

import actions from './actions';
import { signIn } from '../../services/usersApi';
import { LOCAL_MESSAGE } from '../../config/Constants';

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({ payload }) {
    try {
      const response = yield call(signIn, payload);
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          switch (status) {
            case 'SUCCESS':
              const token = Buffer.from(JSON.stringify(response.data)).toString(
                'base64'
              );
              yield put({
                type: actions.LOGIN_SUCCESS,
                token: response.data,
              });
              yield localStorage.setItem('id_token', token);
              break;
            default:
              yield put({
                type: actions.LOGIN_ERROR,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }
          break;
        default:
          yield put({
            type: actions.LOGIN_ERROR,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.LOGIN_ERROR,
        payload: LOCAL_MESSAGE.somthingWrong,
      });
    }
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token =
      getToken().get('idToken') &&
      JSON.parse(
        Buffer.from(getToken().get('idToken'), 'base64').toString('ascii')
      );
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
      });
    }
  });
}
export default function* rootSaga() {
  yield all([fork(checkAuthorization), fork(loginRequest), fork(logout)]);
}
