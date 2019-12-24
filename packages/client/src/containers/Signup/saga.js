// saga.js
import { all, takeEvery, put } from 'redux-saga/effects';
import Actions from './actions';
import { signUp } from '../../services/usersApi';

function* fetchSignupDataEffect() {
  try {
    let profile = 'DemoProfileData';
    yield put(Actions.fetchSignUpSaveSuccess(profile));
  } catch (error) {
    yield put(Actions.fetchSignUpSaveFailure(error));
  }
}

export default function* signUpSaga() {
  yield all([takeEvery(Actions.FETCH_START, fetchSignupDataEffect)]);
}
