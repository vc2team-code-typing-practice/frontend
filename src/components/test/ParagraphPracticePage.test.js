import React from 'react';

import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ParagraphPracticePage from '../../pages/ParagraphPracticePage';
import { renderTest } from '../../utils/renderTest';

import reducer, {
  getParagraphListSuccess,
  getWordListSuccess,
} from './mock/ProblemSliceMock';
import { loadUserDbDataSuccess } from './mock/UserSliceMock';

beforeEach(() => {
  renderTest(
    <BrowserRouter>
      <ParagraphPracticePage />
    </BrowserRouter>,
  );
});

test('should get wordList', () => {
  const previousState = {
    isLoading: false,
    wordList: [],
    sentenceList: [],
    paragraphList: [],
  };

  expect(
    reducer(
      previousState,
      getWordListSuccess(['function', 'console.log', 'await']),
    ),
  ).toEqual({
    isLoading: false,
    wordList: ['function', 'console.log', 'await'],
    sentenceList: [],
    paragraphList: [],
  });
});

test('긴 글 타자 연습페이지로 이동했을 때, DB에서 가져온 긴 글 문제를 redux에 저장해야 합니다.', () => {
  const previousState = {
    isLoading: false,
    wordList: [],
    sentenceList: [],
    paragraphList: [],
  };

  expect(
    reducer(
      previousState,
      getParagraphListSuccess([
        'const mostWordsFound = (sentences) => {\n  let bigg…ber, biggerNumber);\n  }\n  return biggerNumber;\n};',
      ]),
    ),
  ).toEqual({
    isLoading: false,
    wordList: [],
    sentenceList: [],
    paragraphList: [
      'const mostWordsFound = (sentences) => {\n  let bigg…ber, biggerNumber);\n  }\n  return biggerNumber;\n};',
    ],
  });
});

test('textarea에 값을 입력하지 않았다가 입력한 경우에는 값이 나타나야합니다.', () => {
  const textarea = screen.getByTestId('paragraph-textarea');
  expect(textarea.value).toBe('');

  fireEvent.change(screen.getByTestId('paragraph-textarea'), {
    target: { value: 'Test is correct' },
  });

  const textareatValue = screen.getByDisplayValue('Test is correct');
  expect(textareatValue.value).toBe('Test is correct');
});

test('긴 글 타자 연습에서 textarea에 입력했을 때, 입력한 값이 나타나야합니다.', () => {
  fireEvent.change(screen.getByTestId('paragraph-textarea'), {
    target: { value: 'for (let i = 0; i < array.length; i++)' },
  });

  const textarea = screen.getByDisplayValue(
    'for (let i = 0; i < array.length; i++)',
  );
  expect(textarea.value).toBe('for (let i = 0; i < array.length; i++)');
});

test('textarea에 값을 입력했다가 지웠을 때 빈칸이어야 합니다.', () => {
  fireEvent.change(screen.getByTestId('paragraph-textarea'), {
    target: { value: 'const testFunc = () => { return 123; }' },
  });

  const textarea = screen.getByDisplayValue(
    'const testFunc = () => { return 123; }',
  );
  expect(textarea.value).toBe('const testFunc = () => { return 123; }');

  fireEvent.change(textarea, { target: { value: '' } });
  expect(textarea.value).toBe('');
});

test('로그인한 유저는 유저 정보가 redux에 저장되어있어야 합니다.', () => {
  const previousState = {
    isRefreshing: false,
    isUserDataLoading: false,
    isUserRecordLoading: false,
    isLoggedIn: true,
    isPracticing: false,
    isGuestUser: false,
    isColorWeaknessUser: false,
    name: 'testname',
    email: 'test1@gmail.com',
    uid: 'testUid',
    soundEffects: true,
    selectedLanguage: 'JavaScript',
    hiscore: 210,
    numberProblems: 20,
    history: [
      {
        typingSpeed: 300,
        accuracy: 100,
        time: '2022-06-18T01:23',
        type: 'sentence',
      },
      {
        typingSpeed: 346,
        accuracy: 100,
        time: '2022-06-18T01:32',
        type: 'sentence',
      },
      {
        typingSpeed: 180,
        accuracy: 61,
        time: '2022-06-18T01:28',
        type: 'sentence',
      },
    ],
  };

  expect(
    reducer(
      previousState,
      loadUserDbDataSuccess({
        isUserDataLoading: false,
        isLoggedIn: true,
        name: 'testname',
        email: 'test1@gmail.com',
        uid: 'testUid',
        soundEffects: true,
        selectedLanguage: 'JavaScript',
        hiscore: 210,
        numberProblems: 20,
        isColorWeaknessUser: false,
      }),
    ),
  ).toEqual({
    isRefreshing: false,
    isUserDataLoading: false,
    isUserRecordLoading: false,
    isLoggedIn: true,
    isPracticing: false,
    isGuestUser: false,
    isColorWeaknessUser: false,
    name: 'testname',
    email: 'test1@gmail.com',
    uid: 'testUid',
    soundEffects: true,
    selectedLanguage: 'JavaScript',
    hiscore: 210,
    numberProblems: 20,
    history: [
      {
        typingSpeed: 300,
        accuracy: 100,
        time: '2022-06-18T01:23',
        type: 'sentence',
      },
      {
        typingSpeed: 346,
        accuracy: 100,
        time: '2022-06-18T01:32',
        type: 'sentence',
      },
      {
        typingSpeed: 180,
        accuracy: 61,
        time: '2022-06-18T01:28',
        type: 'sentence',
      },
    ],
  });
});
