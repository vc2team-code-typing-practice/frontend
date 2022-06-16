import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>올바르지 않은 페이지 경로입니다.</h1>
      <button onClick={handleButtonClick}>메인 화면으로 돌아가기</button>
    </div>
  );
}
