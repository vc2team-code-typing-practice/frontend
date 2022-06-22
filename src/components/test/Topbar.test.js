import React from 'react';

import { fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ModalPortal from '../../ModalPortal';
import { renderTest } from '../../utils/renderTest';
import Button from '../Button';
import Modal from '../Modal';
import Topbar from '../Topbar';

test('Topbar 컴포넌트가 랜더링이 되어야합니다.', () => {
  renderTest(
    <BrowserRouter>
      <Topbar />
    </BrowserRouter>,
  );
});

test('타자 연습 도중 Topbar를 클릭했을 때 modal창이 떠야합니다.', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);

  const setIsShowingModal = jest.fn();
  const handleGoBackHomeButtonClick = jest.fn();
  const handleResumePracticeButtonClick = jest.fn();

  const { getByText } = renderTest(
    <BrowserRouter>
      <ModalPortal>
        <Modal
          message={
            <div>
              <p>
                정말로 연습을 종료하시겠습니까? <br />
              </p>
              <div>
                <Button onClick={handleGoBackHomeButtonClick}>Yes</Button>
                <Button onClick={handleResumePracticeButtonClick}>No</Button>
              </div>
            </div>
          }
          onCloseModal={setIsShowingModal}
        ></Modal>
      </ModalPortal>
    </BrowserRouter>,
  );

  expect(getByText('정말로 연습을 종료하시겠습니까?')).toBeTruthy();
  expect(getByText('Yes')).toBeTruthy();
  expect(getByText('No')).toBeTruthy();

  fireEvent.click(getByText(/Yes/i));
  expect(handleGoBackHomeButtonClick).toBeCalled();

  fireEvent.click(getByText(/No/i));
  expect(handleResumePracticeButtonClick).toBeCalled();

  fireEvent.click(getByText('X'));
  expect(setIsShowingModal).toBeCalled();
});
