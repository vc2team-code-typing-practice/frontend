import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { render as rltRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import problemSlice from './features/problemSlice';
import userSlice from './features/userSlice';

function renderTest(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: userSlice, problem: problemSlice },
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
