import React from 'react';

import { useSelector } from 'react-redux';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

export default function Home() {
  const isLogined = useSelector((state) => state.user.isLogined);

  return (
    <div>
      <div>
        <h1>쉽게 즐기는 코딩 타자 연습</h1>
      </div>
      <div>{!isLogined ? <LoginButton /> : <LogoutButton />}</div>
    </div>
  );
}
