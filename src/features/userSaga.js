import { put, takeLatest, call } from 'redux-saga/effects';

import { postAxios, getAxios, patchAxios } from '../api';
import { authService, firebaseInstance } from '../auth';

import {
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  changeSetting,
} from './userSlice';

const provider = new firebaseInstance.auth.GoogleAuthProvider();

function* loginSaga(action) {
  if (action.payload) {
    const userDbData = yield call(() => {
      return getAxios(
        process.env.REACT_APP_SERVER_URL +
          '/users/' +
          action.payload.userAuth.uid,
      );
    });

    yield put(loginSuccess(userDbData.data));
  } else {
    const authData = yield call(() => {
      return authService.signInWithPopup(provider);
    });

    yield postAxios(
      process.env.REACT_APP_SERVER_URL + '/auth/login',
      authData.user,
    );

    const userDbData = yield call(() => {
      return getAxios(
        process.env.REACT_APP_SERVER_URL + '/users/' + authData.user.uid,
      );
    });

    yield put(loginSuccess(userDbData.data));
  }
}

function* logoutSaga() {
  yield call(() => {
    authService.signOut();
  });

  yield put(logoutSuccess());
}

function* changeSettingSaga(action) {
  yield patchAxios(
    process.env.REACT_APP_SERVER_URL + '/users/' + action.payload.id,
    {
      id: action.payload.id,
      selectedLanguage: action.payload.selectedLanguageSetting,
      soundEffects: action.payload.soundEffectsSetting,
    },
  );
}

export function* watchLogin() {
  yield takeLatest(login, loginSaga);
}

export function* watchLogout() {
  yield takeLatest(logout, logoutSaga);
}

export function* watchChangeSetting() {
  yield takeLatest(changeSetting, changeSettingSaga);
}
