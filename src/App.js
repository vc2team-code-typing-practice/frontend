import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { setAxios } from './api';
import './App.scss';
import { authService } from './auth';
import { loginSuccess } from './features/userSlice';
import Home from './pages/Home';

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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
