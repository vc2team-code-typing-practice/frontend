import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ModalPortal from '../../ModalPortal';
import Button from '../Button';
import Modal from '../Modal';
test('언어 선택시 타자연습 종류를 선택할 수 있는 modal창이 떠야합니다.', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);

  const handleClose = jest.fn();
  const handleWordButtonClick = jest.fn();
  const handleSentenceButtnoCLick = jest.fn();
  const handleParagraphButtnoCLick = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <ModalPortal>
        <Modal
          onCloseModal={handleClose}
          message={
            <div>
              <div>
                <Button onClick={handleWordButtonClick}>낱말 연습</Button>
              </div>
              <div>
                <Button onClick={handleSentenceButtnoCLick}>
                  짧은 글 연습
                </Button>
              </div>
              <div>
                <Button onClick={handleParagraphButtnoCLick}>긴 글 연습</Button>
              </div>
            </div>
          }
        ></Modal>
      </ModalPortal>
    </BrowserRouter>,
  );

  expect(getByText('낱말 연습')).toBeTruthy();
  expect(getByText('짧은 글 연습')).toBeTruthy();
  expect(getByText('긴 글 연습')).toBeTruthy();

  fireEvent.click(getByText('X'));
  expect(handleClose).toBeCalledTimes(1);

  fireEvent.click(getByText('낱말 연습'));
  expect(handleWordButtonClick).toBeCalledTimes(1);

  fireEvent.click(getByText('짧은 글 연습'));
  expect(handleSentenceButtnoCLick).toBeCalledTimes(1);

  fireEvent.click(getByText('긴 글 연습'));
  expect(handleParagraphButtnoCLick).toBeCalledTimes(1);
});
