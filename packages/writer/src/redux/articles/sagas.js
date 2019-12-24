import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import fakeData from './fakeData';

const fakeDataList = new fakeData(5).getAll();

function* getArticles() {
  try {
    // let data = yield call(API.getData, payload);
    yield put(actions.getArticleSuccess(fakeDataList));
  } catch (error) {
    console.log(error);
    yield put(actions.getArticleError(error));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_ARTICLE, getArticles)]);
}
