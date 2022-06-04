import React from 'react';

import { authService, firebaseInstance } from '../auth';

export default function GoogleLoginButton() {
  const handleButtonClick = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();

    await authService.signInWithPopup(provider);
  };

  return <button onClick={handleButtonClick}>구글계정으로 로그인하기</button>;
}
