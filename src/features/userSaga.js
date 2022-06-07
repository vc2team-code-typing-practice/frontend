import { put, takeLatest, call, delay } from 'redux-saga/effects';

import { axiosGetRequest, axiosPostRequest, axiosPatchRequest } from '../api';
import { authService, firebaseInstance } from '../auth';

import {
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  changeSetting,
  loadUserDbData,
  loadUserDbDataSuccess,
} from './userSlice';

const provider = new firebaseInstance.auth.GoogleAuthProvider();

function* loginSaga() {
  const authData = yield call(() => {
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    return authService.signInWithPopup(provider);
  });

  const userDbData = yield call(() => {
    return axiosGetRequest(
      process.env.REACT_APP_SERVER_URL + '/users/' + authData.user.uid,
    );
  });

  if (userDbData.data) {
    yield put(loginSuccess(userDbData.data));
  } else {
    yield call(() => {
      axiosPostRequest(
        process.env.REACT_APP_SERVER_URL + '/auth/login',
        authData.user,
      );
    });

    yield delay(3000);

    const userDbData = yield call(() => {
      return axiosGetRequest(
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
  yield axiosPatchRequest(
    process.env.REACT_APP_SERVER_URL + '/users/' + action.payload.id,
    {
      id: action.payload.id,
      selectedLanguage: action.payload.selectedLanguageSetting,
      soundEffects: action.payload.soundEffectsSetting,
    },
  );
}

function* loadUserDbDataSaga(action) {
  const userDbData = yield call(() => {
    return axiosGetRequest(
      process.env.REACT_APP_SERVER_URL +
        '/users/' +
        action.payload.userAuth.uid,
    );
  });

  yield put(loadUserDbDataSuccess(userDbData.data));
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

export function* watchLoadUserDbData() {
  yield takeLatest(loadUserDbData, loadUserDbDataSaga);
}
