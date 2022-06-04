import React from 'react';

import GoogleLoginButton from '../components/GoogleLoginButton';

export default function Home() {
  return (
    <div>
      <div>
        <h1>쉽게 즐기는 코딩 타자 연습</h1>
      </div>
      <div>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
