import React, { useState } from 'react';

import classNames from 'classnames/bind';
import { FaKeyboard, FaHome } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { startPractice, finishPractice } from '../features/userSlice';
import ModalPortal from '../ModalPortal';

import Button from './Button';
import styles from './Menu.module.scss';
import Modal from './Modal';

const menu = classNames.bind(styles);

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const name = useSelector((state) => state.user.name);
  const isPracticing = useSelector((state) => state.user.isPracticing);
  const selectedLanguage = useSelector((state) => state.user.selectedLanguage);
  const [isShowing, setIsShowing] = useState(false);
  const items = [
    {
      path: `/practice/${selectedLanguage}/word`,
      text: '낱말 연습',
      logo: <FaKeyboard />,
    },
    {
      path: `/practice/${selectedLanguage}/sentence`,
      text: '짧은 글 연습',
      logo: <FaKeyboard />,
    },
    {
      path: `/practice/${selectedLanguage}/paragraph`,
      text: '긴 글 연습',
      logo: <FaKeyboard />,
    },
  ];

  const handleStartPracticeButtonClick = () => {
    dispatch(startPractice());
  };

  const handleGoBackHomeButtonClick = () => {
    setIsShowing(false);
    dispatch(finishPractice());
    navigate('/');
  };

  const handleResumePracticeButtonClick = () => {
    setIsShowing(false);
  };

  const handleModalOpen = () => {
    setIsShowing(true);
  };

  return (
    <div>
      {isLoggedIn && (
        <ul>
          <li>{name}님 환영합니다</li>
          <li>선택한 언어: {selectedLanguage}</li>
        </ul>
      )}
      <hr />
      {isPracticing ? (
        <div className={menu('menu')}>
          <div className={menu('menu__item')} onClick={handleModalOpen}>
            {<FaHome />} {'홈으로 이동하기'}
          </div>
        </div>
      ) : (
        <div>
          <ul className={menu('menu')}>
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleStartPracticeButtonClick}
              >
                <li className={menu('menu__item')}>
                  {item.logo} {item.text}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
      {isShowing && (
        <ModalPortal>
          <Modal
            message={
              <div>
                <p>정말로 게임을종료하시겠습니까?</p>
                <p>진행상황은 저장되지 않습니다.</p>
                <Button onClick={handleGoBackHomeButtonClick}>예</Button>
                <Button onClick={handleResumePracticeButtonClick}>
                  아니오
                </Button>
              </div>
            }
            onCloseModal={setIsShowing}
          ></Modal>
        </ModalPortal>
      )}
    </div>
  );
}
