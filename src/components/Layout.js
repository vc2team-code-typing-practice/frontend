import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';

import Menu from './Menu';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div>
      <Topbar />
      <div className="app">
        <div className="app__sidebar">
          <Menu />
        </div>
        <main className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
