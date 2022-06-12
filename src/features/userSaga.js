import { put, takeLatest, call, delay, take } from 'redux-saga/effects';

import {
  axiosGetRequest,
  axiosPostRequest,
  axiosPatchRequest,
  setAxios,
} from '../api';
import { authService, checkAuthChanged, firebaseInstance } from '../auth';

import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  changeSetting,
  loadUserDbData,
  loadUserDbDataSuccess,
  finishRefresh,
  startRefresh,
  loadUserRecord,
  loadUserRecordSuccess,
  updateUserRecord,
} from './userSlice';

const provider = new firebaseInstance.auth.GoogleAuthProvider();

function* loginSaga() {
  try {
    const authData = yield call(() => {
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      return authService.signInWithPopup(provider);
    });

    const token = yield call(() => {
      return authData.user.getIdToken();
    });

    yield call(() => {
      setAxios(token);
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
  } catch (err) {
    console.error(err);
    return yield put(loginFailure());
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
      selectedLanguage: action.payload.selectedLanguageSetting,
      soundEffects: action.payload.soundEffectsSetting,
      numberProblems: action.payload.numberProblemsSetting,
    },
  );
}

function* loadUserDbDataSaga(action) {
  const userDbData = yield call(() => {
    return axiosGetRequest(
      process.env.REACT_APP_SERVER_URL + '/users/' + action.payload.uid,
    );
  });

  yield put(loadUserDbDataSuccess(userDbData.data));
}

function* refreshSaga() {
  const userAuth = yield call(() => {
    return checkAuthChanged();
  });

  const token = yield call(() => {
    return userAuth?.getIdToken();
  });

  yield call(() => {
    setAxios(token);
  });

  if (userAuth) {
    yield put(loadUserDbData(userAuth));
    yield take(loadUserDbDataSuccess);
  }

  yield put(finishRefresh());
}

function* loadUserRecordSaga(action) {
  const userRecord = yield call(() => {
    return axiosGetRequest(
      process.env.REACT_APP_SERVER_URL +
        '/users/' +
        action.payload.id +
        '/record/' +
        action.payload.selectedLanguageSetting,
    );
  });

  yield put(loadUserRecordSuccess(userRecord.data));
}

function* updateUserRecordSaga(action) {
  yield axiosPatchRequest(
    process.env.REACT_APP_SERVER_URL +
      '/users/' +
      action.payload.uid +
      '/record/' +
      action.payload.language,
    {
      typingSpeed: action.payload.typingSpeed,
      accuracy: action.payload.accuracy,
      time: action.payload.time,
      type: action.payload.type,
      score: action.payload.score,
    },
  );
}

export function* watchRefresh() {
  yield takeLatest(startRefresh, refreshSaga);
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

export function* watchLoadUserRecord() {
  yield takeLatest(loadUserRecord, loadUserRecordSaga);
}
export function* watchupdateUserRecord() {
  yield takeLatest(updateUserRecord, updateUserRecordSaga);
}
