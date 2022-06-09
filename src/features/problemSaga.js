import { put, takeLatest, call, delay, take } from 'redux-saga/effects';

import { axiosGetRequest } from '../api';

import { getWordList, getWordListSuccess } from './problemSlice';

function* getWordListSaga(action) {
  const language = action.payload.languages;
  const practiceType = action.payload.types;

  const result = yield call(() => {
    return axiosGetRequest(
      process.env.REACT_APP_SERVER_URL + '/languages/' + language,
      {
        params: { type: practiceType },
      },
    );
  });

  yield put(getWordListSuccess(result.data[0][language]));
}

export function* watchGetWordList() {
  yield takeLatest(getWordList, getWordListSaga);
}
