import { put, takeLatest, call } from 'redux-saga/effects';

import { authService, firebaseInstance } from '../auth';

import { getUser, getUserSuccess } from './userSlice';
const provider = new firebaseInstance.auth.GoogleAuthProvider();

function* getUserSaga() {
  const data = yield call(() => {
    return authService.signInWithPopup(provider);
  });

  yield put(getUserSuccess(data.user));
}

export function* watchGetUsers() {
  yield takeLatest(getUser, getUserSaga);
}
