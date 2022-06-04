import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Button from '../components/Button';
import { login, logout } from '../features/userSlice';

export default function Home() {
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
      <div>
        <h1>쉽게 즐기는 코딩 타자 연습</h1>
      </div>
      <div>
        {!isLoggedIn ? (
          <Button onClick={handleLoginButtonClick}>구글로 로그인</Button>
        ) : (
          <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
        )}
      </div>
    </div>
  );
}
