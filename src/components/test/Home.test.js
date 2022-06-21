import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home';
import { renderTest } from '../../utils/renderTest';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

test('홈페이지에 배너가 보여야 합니다.', () => {
  renderTest(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

  const headerElement = screen.getByTestId('home-banner');

  expect(headerElement).toHaveTextContent('Choose What You Want To Practice!');
});

test('Python언어를 눌렀을 경우, 모달창이 보여야 합니다.', () => {
  renderTest(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

  userEvent.click(screen.getByTestId('python'));

  const sentencePractice = screen.getByText(/긴 글 연습/i);

  expect(sentencePractice).toBeInTheDocument();
});
