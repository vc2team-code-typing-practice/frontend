import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { all, fork } from 'redux-saga/effects';

import {
  watchGetParagraphList,
  watchGetSentenceList,
  watchGetWordList,
} from '../features/problemSaga';
import problemSlice from '../features/problemSlice';
import {
  watchLogin,
  watchAnonymousLogin,
  watchLogout,
  watchChangeSetting,
  watchLoadUserDbData,
  watchRefresh,
  watchLoadUserRecord,
  watchupdateUserRecord,
} from '../features/userSaga';
import userSlice from '../features/userSlice';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchAnonymousLogin),
    fork(watchLogout),
    fork(watchChangeSetting),
    fork(watchLoadUserDbData),
    fork(watchRefresh),
    fork(watchGetWordList),
    fork(watchGetSentenceList),
    fork(watchGetParagraphList),
    fork(watchupdateUserRecord),
    fork(watchLoadUserRecord),
  ]);
}

const createStore = () => {
  const store = configureStore({
    reducer: {
      user: userSlice,
      problem: problemSlice,
    },
    devTools: true,
    middleware: [sagaMiddleware, logger],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
