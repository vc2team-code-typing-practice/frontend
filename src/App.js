import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import './App.scss';
import Layout from './components/Layout';
import { startRefresh } from './features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startRefresh());
  }, []);

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
