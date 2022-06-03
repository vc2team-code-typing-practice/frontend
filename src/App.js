import React from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
