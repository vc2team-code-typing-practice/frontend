import React from 'react';

import { useDispatch } from 'react-redux';

import { login } from '../features/userSlice';

export default function LoginButton() {
  const dispatch = useDispatch();
  const handleLoginButtonClick = () => {
    dispatch(login());
  };

  return (
    <div>
      <button onClick={handleLoginButtonClick}>구글계정으로 로그인하기</button>
    </div>
  );
}
