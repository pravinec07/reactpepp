import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';
import { signIn } from '../../services/usersApi';
const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    try {
      const response = yield call(signIn, payload);
      switch (response.status) {
        case 200:
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: response.data.accessToken,
            profile: response.data,
          });
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

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
    yield localStorage.setItem('profile', JSON.stringify(payload.profile));
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
