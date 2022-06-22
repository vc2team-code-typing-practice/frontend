import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { render as rltRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import problemsSliceMock from '../components/test/mock/ProblemSliceMock';
import userSliceMock from '../components/test/mock/UserSliceMock';

function renderTest(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: userSliceMock, problem: problemsSliceMock },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rltRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { renderTest };
