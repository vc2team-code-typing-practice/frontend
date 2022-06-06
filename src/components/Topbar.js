import React from 'react';

import { FaFileCode } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, logout } from '../features/userSlice';

import Button from './Button';
import './Topbar.scss';

export default function Topbar() {
  const userId = useSelector((state) => state.user.uid);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginButtonClick = () => {
    dispatch(login());
  };
  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };
  const handleMyPageButtonClick = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <span className="topbar__logo" onClick={() => navigate('/')}>
            <FaFileCode /> Code Typing Practice
          </span>
        </div>
        <div className="topbar__right">
          {!isLoggedIn ? (
            <Button onClick={handleLoginButtonClick}>Google SignIn</Button>
          ) : (
            <div>
              <Button onClick={handleMyPageButtonClick}>My Page</Button>
              <Button onClick={handleLogoutButtonClick}>Sign Out</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
