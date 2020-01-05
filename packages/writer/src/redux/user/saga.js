import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import actions from './actions';
import {
  signUp,
  sendOTP,
  resendOTP,
  verifyOTP,
  changePassword,
  updateProfile,
  getProfile,
} from '../../services/usersApi';
import SignUpRequestModel from '../../models/signUp';
import { LOCAL_MESSAGE } from '../../config/Constants';
import { ChangePasswordModel, ProfileModel } from '../../models/updateProfile';
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
        default:
          yield put({
            type: actions.SIGNUP_ERROR,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.SIGNUP_ERROR,
        payload: LOCAL_MESSAGE.somthingWrong,
      });
    }
  });
}
function* sendOTPRequest() {
  yield takeEvery(actions.SEND_OTP_START, function*({ payload }) {
    try {
      const response = yield call(sendOTP, payload);
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
                payload: true,
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
        default:
          yield put({
            type: actions.SEND_OTP_FAILURE,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.SEND_OTP_FAILURE,
        payload: LOCAL_MESSAGE.somthingWrong,
      });
    }
  });
}

function* resendOTPRequest() {
  yield takeEvery(actions.RESEND_OTP_START, function*({ payload }) {
    try {
      const response = yield call(resendOTP, payload);
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
                payload: true,
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
        default:
          yield put({
            type: actions.RESEND_OTP_FAILURE,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.RESEND_OTP_FAILURE,
        payload: LOCAL_MESSAGE.somthingWrong,
      });
    }
  });
}

function* verifyOTPRequest() {
  yield takeEvery(actions.VERIFY_OTP_START, function*({ payload }) {
    try {
      const response = yield call(verifyOTP, payload);
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.VERIFY_OTP_SUCCESS,
                payload: true,
              });
              break;
            default:
              yield put({
                type: actions.VERIFY_OTP_FAILURE,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }
          break;
        default:
          yield put({
            type: actions.VERIFY_OTP_FAILURE,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.VERIFY_OTP_FAILURE,
        payload: LOCAL_MESSAGE.somthingWrong,
      });
    }
  });
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

        default:
          yield put({
            type: actions.CHANGE_PASSWORD_ERROR,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
          break;
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.CHANGE_PASSWORD_ERROR,
        payload: LOCAL_MESSAGE.somthingWrong,
      });
    }
  });
}

export function* updateProfileRequest() {
  yield takeEvery(actions.UPDATE_PROFILE_START, function*({ payload }) {
    const payloadData = new ProfileModel(payload);
    console.log(payload, payloadData, 'saga');

    try {
      const response = yield call(updateProfile, payloadData);
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
                type: actions.UPDATE_PROFILE_SUCCESS,
                payload: response.data,
              });
              break;
            default:
              yield put({
                type: actions.UPDATE_PROFILE_FAILURE,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;

        default:
          yield put({
            type: actions.UPDATE_PROFILE_FAILURE,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
          break;
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.UPDATE_PROFILE_FAILURE,
        payload: LOCAL_MESSAGE.somthingWrong,
      });
    }
  });
}
export function* getProfileRequest() {
  yield takeEvery(actions.GET_PROFILE_START, function*({ payload }) {
    // const payloadData = new ProfileModel(payload);
    console.log(payload, 'saga');

    try {
      const response = yield call(getProfile, payload);
      console.log(response, payload, '-------->');
      switch (response.status) {
        case 200:
          const status =
            response.data.metadata && response.data.metadata.status
              ? response.data.metadata.status
              : 'SUCCESS';
          switch (status) {
            case 'SUCCESS':
              yield put({
                type: actions.GET_PROFILE_SUCCESS,
                payload: response.data,
              });
              break;
            default:
              yield put({
                type: actions.GET_PROFILE_FAILURE,
                payload: response.data.errors[0].message.split('(')[0],
              });
              break;
          }

          break;

        default:
          yield put({
            type: actions.GET_PROFILE_FAILURE,
            payload: LOCAL_MESSAGE.somthingWrong,
          });
          break;
      }
    } catch (e) {
      console.log('Error ', e);
      yield put({
        type: actions.GET_PROFILE_FAILURE,
        payload: LOCAL_MESSAGE.somthingWrong,
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
    fork(updateProfileRequest),
    fork(getProfileRequest),
  ]);
}
