import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { setAxios } from './api';
import './App.scss';
import { authService } from './auth';
import Layout from './components/Layout';
import { loginSuccess } from './features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((userAuth) => {
      userAuth && dispatch(loginSuccess(userAuth));
      setAxios(userAuth);
    });
  }, []);

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
