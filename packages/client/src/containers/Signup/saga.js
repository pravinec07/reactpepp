// saga.js
import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import { signUp } from '../../services/usersApi';

function* fetchSignupDataEffect() {
  try {
    yield takeEvery(actions.FETCH_START, function*(payload) {
      let data = yield call(signUp, payload.payload);
      yield put(actions.fetchSignUpSaveSuccess(data));
    });
  } catch (error) {
    console.log(error);
    yield put(actions.getArticleError(error));
  }
}
export default function* rootSaga() {
  yield all([fork(fetchSignupDataEffect)]);
}
