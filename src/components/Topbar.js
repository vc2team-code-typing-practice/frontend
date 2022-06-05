import React from 'react';

import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, logout } from '../features/userSlice';

import Button from './Button';
import './Topbar.scss';

export default function Topbar() {
  const userId = useSelector((state) => state.user.uid);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const handleLoginButtonClick = () => {
    dispatch(login());
  };
  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <span className="topbar__logo">
            <DeveloperModeIcon /> Code Typing Practice
          </span>
        </div>
        <div className="topbar__right">
          <Link to={`/users/${userId}`}>
            <button>내 정보 보기</button>
          </Link>
          {!isLoggedIn ? (
            <Button onClick={handleLoginButtonClick}>Google SignIn</Button>
          ) : (
            <Button onClick={handleLogoutButtonClick}>Sign Out</Button>
          )}
        </div>
      </div>
    </div>
  );
}
