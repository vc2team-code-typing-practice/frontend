import { put, takeLatest, call } from 'redux-saga/effects';

import { postAxios } from '../api';
import { authService, firebaseInstance } from '../auth';

import { login, loginSuccess, logout, logoutSuccess } from './userSlice';

const provider = new firebaseInstance.auth.GoogleAuthProvider();

function* loginSaga() {
  const data = yield call(() => {
    return authService.signInWithPopup(provider);
  });
  yield postAxios(process.env.REACT_APP_SERVER_URL + '/auth/login', data.user);
  yield put(loginSuccess(data.user));
}

function* logoutSaga() {
  yield call(() => {
    authService.signOut();
  });

  yield put(logoutSuccess());
}

export function* watchLogin() {
  yield takeLatest(login, loginSaga);
}

export function* watchLogout() {
  yield takeLatest(logout, logoutSaga);
}
