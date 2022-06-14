import { put, takeLatest, call } from 'redux-saga/effects';

import { axiosGetRequest } from '../api';

import {
  getParagraphList,
  getParagraphListSuccess,
  getSentenceList,
  getSentenceListSucces,
  getWordList,
  getWordListSuccess,
} from './problemSlice';

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

  const data = [];

  yield call(() => {
    result.data.map((element) => {
      data.push(element.content);
    });
  });

  yield put(getWordListSuccess(data));
}

function* getSentenceListSaga(action) {
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

  const data = [];

  yield call(() => {
    result.data.map((element) => {
      data.push(element.content);
    });
  });

  yield put(getSentenceListSucces(data));
}

function* getParagraphListSaga(action) {
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

  const data = [];

  yield call(() => {
    result.data.map((element) => {
      data.push(element.content);
    });
  });

  yield put(getParagraphListSuccess(data));
}

export function* watchGetWordList() {
  yield takeLatest(getWordList, getWordListSaga);
}

export function* watchGetSentenceList() {
  yield takeLatest(getSentenceList, getSentenceListSaga);
}

export function* watchGetParagraphList() {
  yield takeLatest(getParagraphList, getParagraphListSaga);
}
