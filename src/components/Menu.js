import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, logout } from '../features/userSlice';

import Button from './Button';

export default function Menu() {
  const items = [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: '/about',
      text: 'About',
    },
    {
      path: '/contact',
      text: 'Contact',
    },
  ];
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const handleLoginButtonClick = () => {
    dispatch(login());
  };
  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <ul className="menu">
        {items.map((item) => (
          <li key={item.path} className="menu__item">
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
      {!isLoggedIn ? (
        <Button onClick={handleLoginButtonClick}>구글로 로그인</Button>
      ) : (
        <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
      )}
    </div>
  );
}
