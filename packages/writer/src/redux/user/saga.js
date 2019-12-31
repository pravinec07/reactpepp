import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import actions from './actions';
import {
  signUp,
  sendOTP,
  resendOTP,
  verifyOTP,
  changePassword,
} from '../../services/usersApi';
import SignUpRequestModel from '../../models/signUp';
import { ChangePasswordModel } from '../../models/updateProfile';
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
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.SIGNUP_SUCCESS,
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
      console.log('payload', payload);
      let response = yield call(verifyOTP, payload.payload);
      console.log('response', response);
      if (response.status == 200) {
        yield put({
          type: actions.VERIFY_OTP_SUCCESS,
          payload: true,
        });
      } else {
        yield put({
          type: actions.VERIFY_OTP_FAILURE,
          payload: response.message,
        });
      }
    });
  } catch (error) {}
}

export function* changePasswordRequest() {
  yield takeEvery(actions.CHANGE_PASSWORD_START, function*({ payload }) {
    console.log(payload, 'saga');
    const payloadData = new ChangePasswordModel(payload);
    console.log(payload, payloadData, '-------->');

    try {
      const response = yield call(changePassword, payloadData);
      console.log(response, payload, payloadData, '-------->');
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.CHANGE_PASSWORD_SUCCESS,
                payload: response.data,
              });
              break;
            default:
              yield put({
                type: actions.CHANGE_PASSWORD_FAILURE,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;
        case 500:
          yield put({
            type: actions.CHANGE_PASSWORD_FAILURE,
            payload: 'Somthing went wrong.',
          });
          break;
        default:
          yield put({
            type: actions.CHANGE_PASSWORD_FAILURE,
            payload: 'Somthing went wrong.',
          });
          break;
      }
    } catch (e) {
      console.log(e, 'error');
      yield put({
        type: actions.SIGNUP_ERROR,
        payload: 'Somthing went wrong.',
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(signUpRequest),
    fork(sendOTPRequest),
    fork(verifyOTPRequest),
    fork(resendOTPRequest),
    fork(changePasswordRequest),
  ]);
}
