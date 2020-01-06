// saga.js
import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import { signUp, sendOTP, resendOTP, verifyOTP } from '../../services/usersApi';

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

function* sendOTPRequest() {
  try {
    yield takeEvery(actions.SEND_OTP_START, function*(payload) {
      let response = yield call(sendOTP, payload.payload);
      console.log('response send', response);
      if (response.status == 200) {
        yield put({
          type: actions.SEND_OTP_SUCCESS,
          payload: true,
        });
      } else {
        console.log('response send  fail', response);
        yield put({
          type: actions.SEND_OTP_FAILURE,
          payload: response.message,
        });
      }
    });
  } catch (error) {
    console.log('response send catch', error);
    yield put({
      type: actions.SEND_OTP_FAILURE,
      payload: error,
    });
  }
}

function* resendOTPRequest() {
  try {
    console.log('resend saga');
    yield takeEvery(actions.RESEND_OTP_START, function*(payload) {
      let response = yield call(resendOTP, payload.payload);
      if (response.status == 200) {
        yield put({
          type: actions.RESEND_OTP_SUCCESS,
          payload: true,
        });
      } else {
        yield put({
          type: actions.RESEND_OTP_FAILURE,
          payload: response.message,
        });
      }
    });
  } catch (error) {
    yield put({
      type: actions.RESEND_OTP_FAILURE,
      payload: error,
    });
  }
}

function* verifyOTPRequest() {
  try {
    yield takeEvery(actions.VERIFY_OTP_START, function*(payload) {
      console.log('payload verify otp', payload);
      let response = yield call(verifyOTP, payload.payload);
      console.log('response verify otp', response);
      if (response.status == 200 && response.data.type !== 'error') {
        console.log('verify otp process if', response);
        yield put({
          type: actions.VERIFY_OTP_SUCCESS,
          payload: response,
        });
      } else {
        console.log('verify otp process else', response);
        yield put({
          type: actions.VERIFY_OTP_FAILURE,
          payload: response,
        });
      }
    });
  } catch (error) {}
}
export default function* rootSaga() {
  yield all([
    fork(fetchSignupDataEffect),
    fork(sendOTPRequest),
    fork(verifyOTPRequest),
    fork(resendOTPRequest),
  ]);
}
