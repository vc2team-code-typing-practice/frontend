import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import App from './App';
import createStore from './store';

const store = createStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

const Router = ({ children }) => {
  if (process.env.NODE_ENV === 'development') {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  return <HashRouter>{children}</HashRouter>;
};

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
