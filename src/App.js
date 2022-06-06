import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { setAxios } from './api';
import './App.scss';
import { authService } from './auth';
import Layout from './components/Layout';
import { login } from './features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((userAuth) => {
      userAuth && dispatch(login({ userAuth }));
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
