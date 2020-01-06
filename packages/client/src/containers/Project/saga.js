// saga.js
import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import { projectSave, articleSave } from '../../services/apiWrapper';

function* fetchProjectDataEffect() {
  try {
    yield takeEvery(actions.FETCH_START, function*(payload) {
      let response = yield call(projectSave, payload.payload, payload.username);
      console.log('project api response', response);
      if (response.status === 200) {
        yield put({
          type: actions.FETCH_SUCCESS,
          payload: response.data,
          id: response.data.id,
        });
      } else {
        yield put({
          type: actions.FETCH_FAILURE,
        });
      }
    });
  } catch (error) {}
}

function* fetchArticleDataEffect() {
  try {
    yield takeEvery(actions.ARTICLE_FETCH_START, function*(payload) {
      let response = yield call(
        articleSave,
        payload.payload,
        payload.projectId
      );
      console.log('articles api response', response);
      if (response.status === 200) {
        yield put({
          type: actions.ARTICLE_FETCH_SUCCESS,
          payload: response.data,
        });
      } else {
        yield put({
          type: actions.ARTICLE_FETCH_FAILURE,
        });
      }
    });
  } catch (error) {
    yield put({
      type: actions.ARTICLE_FETCH_FAILURE,
    });
  }
}
export default function* rootSaga() {
  yield all([fork(fetchProjectDataEffect), fork(fetchArticleDataEffect)]);
}
