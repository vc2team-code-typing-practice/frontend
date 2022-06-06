import React from 'react';

import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

export default function PracticePage() {
  const { languages, types } = useParams();
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      {isLoggedIn ? (
        <h1>hello world</h1>
      ) : (
        <div>
          <p>로그인 해야 합니다</p>
          <Link to="/">뒤로가기</Link>
        </div>
      )}
    </div>
  );
}
