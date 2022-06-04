import React from 'react';

import { useDispatch } from 'react-redux';

import { logout } from '../features/userSlice';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <button onClick={handleLogoutButtonClick}>로그아웃 하기</button>
    </div>
  );
}
