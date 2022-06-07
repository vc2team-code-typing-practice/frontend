import React from 'react';

import classNames from 'classnames/bind';
import { FaFileCode } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, logout } from '../features/userSlice';

import Button from './Button';
import styles from './Topbar.module.scss';

const topbar = classNames.bind(styles);

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
    <div className={topbar('topbar')}>
      <div className={topbar('topbar__wrapper')}>
        <div className={topbar('topbar__left')}>
          <span
            className={topbar('topbar__logo')}
            onClick={() => navigate('/')}
          >
            <FaFileCode /> Code Typing Practice
          </span>
        </div>
        <div className={topbar('topbar__right')}>
          {!isLoggedIn ? (
            <Button onClick={handleLoginButtonClick}>Google SignIn</Button>
          ) : (
            <div className={topbar('topbar__right')}>
              <Button onClick={handleMyPageButtonClick}>My Page</Button>
              <Button onClick={handleLogoutButtonClick}>Sign Out</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
