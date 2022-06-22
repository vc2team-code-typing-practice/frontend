import React from 'react';

import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SentencePracticePage from '../../pages/SentencePracticePage';
import { renderTest } from '../../utils/renderTest';

import reducer, { getSentenceListSucces } from './mock/problemSliceMock';

test('짧은 글 타자 연습페이지로 이동했을 때, DB에서 가져온 짧은 글 문제를 redux에 저장해야 합니다.', () => {
  const previousState = {
    isLoading: false,
    wordList: [],
    sentenceList: [],
    paragraphList: [],
  };

  expect(
    reducer(
      previousState,
      getSentenceListSucces(['while (true)', 'console.log(avx)']),
    ),
  ).toEqual({
    isLoading: false,
    wordList: [],
    sentenceList: ['while (true)', 'console.log(avx)'],
    paragraphList: [],
  });
});

beforeEach(() => {
  renderTest(
    <BrowserRouter>
      <SentencePracticePage />
    </BrowserRouter>,
  );
});

test('아무런 값을 입력하지 않은 경우 빈칸이어야 합니다.', () => {
  const inputValue = screen.getByTestId('test-input');

  expect(inputValue.value).toEqual('');
});

test('짧은 글 연습에서 input에 입력했을 때, 그 값이 제대로 입력되어야 합니다.', () => {
  fireEvent.change(screen.getByTestId('test-input'), {
    target: { value: 'console.log' },
  });

  const input = screen.getByDisplayValue('console.log');
  expect(input.value).toBe('console.log');
});

test('input에 값을 입력했다가 지운 경우 빈칸이어야 합니다.', () => {
  fireEvent.change(screen.getByTestId('test-input'), {
    target: { value: 'console.log("test")' },
  });
  const input = screen.getByDisplayValue('console.log("test")');
  expect(input.value).toBe('console.log("test")');

  fireEvent.change(screen.getByTestId('test-input'), { target: { value: '' } });
  expect(input.value).toBe('');
});
