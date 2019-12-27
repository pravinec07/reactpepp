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
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.SEND_OTP_SUCCESS,
              });
              break;
            default:
              yield put({
                type: actions.SEND_OTP_FAILURE,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;
        case 500:
          yield put({ type: actions.SEND_OTP_FAILURE });
          break;
        default:
          yield put({ type: actions.SEND_OTP_FAILURE });
          break;
      }
    });
  } catch (error) {}
}

function* resendOTPRequest() {
  try {
    console.log('resend saga');
    yield takeEvery(actions.RESEND_OTP_START, function*(payload) {
      let response = yield call(resendOTP, payload.payload);
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.RESEND_OTP_SUCCESS,
              });
              break;
            default:
              yield put({
                type: actions.RESEND_OTP_FAILURE,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;
        case 500:
          yield put({ type: actions.RESEND_OTP_FAILURE });
          break;
        default:
          yield put({ type: actions.RESEND_OTP_FAILURE });
          break;
      }
    });
  } catch (error) {}
}

function* verifyOTPRequest() {
  try {
    yield takeEvery(actions.VERIFY_OTP_START, function*(payload) {
      let response = yield call(verifyOTP, payload.payload);
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.RESEND_OTP_SUCCESS,
              });
              break;
            default:
              yield put({
                type: actions.RESEND_OTP_FAILURE,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;
        case 500:
          yield put({ type: actions.RESEND_OTP_FAILURE });
          break;
        default:
          yield put({ type: actions.RESEND_OTP_FAILURE });
          break;
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
