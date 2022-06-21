import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import UserPage from '../../pages/UserPage';
import { renderTest } from '../../utils/renderTest';

test('My Page에서는 유저의 이름을 볼 수 있습니다.', () => {
  renderTest(
    <BrowserRouter>
      <UserPage />
    </BrowserRouter>,
  );

  const userName = screen.getByTestId('username');

  expect(userName).toHaveTextContent('testname');
});

test('효과음 출력의 radio 버튼 OFF을 선택하면, 효과음이 false로 설정됩니다.', () => {
  renderTest(
    <BrowserRouter>
      <UserPage />
    </BrowserRouter>,
  );

  const radio = screen.getByLabelText('OFF');

  expect(radio.checked).toEqual(false);
});

test('유저는 연습할 언어를 고를 수 있습니다.', () => {
  renderTest(
    <BrowserRouter>
      <UserPage />
    </BrowserRouter>,
  );

  const selectedLanguageRadio = screen.getByLabelText('Python');

  fireEvent.change(selectedLanguageRadio, { target: { value: 'JavaScript' } });

  expect(selectedLanguageRadio.value).toEqual('JavaScript');
});

test('유저는 진행할 연습의 문제 개수를 고를 수 있습니다.', () => {
  renderTest(
    <BrowserRouter>
      <UserPage />
    </BrowserRouter>,
  );

  const numberProblemsRadio = screen.getByLabelText('40개');

  fireEvent.click(numberProblemsRadio);

  expect(numberProblemsRadio).toBeChecked();
});

test('유저는 진행한 연습의 기록을 볼 수 있습니다.', () => {
  renderTest(
    <BrowserRouter>
      <UserPage />
    </BrowserRouter>,
  );

  const record = screen.getByTestId('record');

  expect(record).toHaveTextContent('정확도');
});
