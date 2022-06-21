import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { render as rltRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import ProblemSliceMock from '../components/test/mock/ProblemSliceMock';
import UserSliceMock from '../components/test/mock/UserSliceMock';

function renderTest(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: UserSliceMock, problem: ProblemSliceMock },
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
