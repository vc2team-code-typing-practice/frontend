import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { all, fork } from 'redux-saga/effects';

import { watchGetUsers } from '../features/userSaga';
import userSlice from '../features/userSlice';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([fork(watchGetUsers)]);
}

const createStore = () => {
  const store = configureStore({
    reducer: {
      user: userSlice,
    },
    devTools: true,
    middleware: [sagaMiddleware, logger],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
