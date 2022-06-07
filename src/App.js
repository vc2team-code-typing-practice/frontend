import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { setAxios } from './api';
import './App.scss';
import { checkAuthChanged } from './auth';
import Layout from './components/Layout';
import { loadUserDbData } from './features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const setInitialState = async () => {
      const userAuth = await checkAuthChanged();

      setAxios(await userAuth?.getIdToken());
      userAuth && dispatch(loadUserDbData({ userAuth }));
    };

    setInitialState();
  }, []);

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
