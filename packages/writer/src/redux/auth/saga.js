import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';
import { signIn } from '../../services/usersApi';
const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    try {
      console.log(payload, 'LOGIN_REQUEST');

      const response = yield call(signIn, payload);
      console.log(response, payload, '-------->');

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
        case 404:
          yield put({ type: actions.LOGIN_ERROR });
          break;
        case 500:
          yield put({ type: actions.LOGIN_ERROR });
          break;
        default:
          yield put({ type: actions.LOGIN_ERROR });
          break;
      }
    } catch (e) {
      yield put({ type: actions.LOGIN_ERROR, payload: e });
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
    // console.log(token,getToken().get("idToken"), "checkAuthorization");
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
