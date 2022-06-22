import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import WordPracticePage from '../../pages/WordPracticePage';
import { renderTest } from '../../utils/renderTest';

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  renderTest(
    <BrowserRouter>
      <WordPracticePage />
    </BrowserRouter>,
  );
});

test('낱말 연습 페이지에 들어가면 키보드가 보여야 합니다.', () => {
  const keyboard = screen.getByText('Enter');

  expect(keyboard).toBeInTheDocument();
});

test('유저는 자신의 타자 연습 정확도를 볼 수 있습니다.', () => {
  const question = screen.getByTestId('accuracy');

  expect(question).toBeInTheDocument();
});

test('연습할 단어가 보여야 합니다.', () => {
  const question = screen.getByTestId('question');

  expect(question).toBeInTheDocument();
});

test('input창에 코드를 입력할 수 있습니다.', () => {
  fireEvent.change(screen.getByTestId('input'), {
    target: { value: 'const' },
  });
  const input = screen.getByDisplayValue('const');
  expect(input.value).toEqual('const');
});
