import React, { useState } from 'react';

import classNames from 'classnames/bind';
import { BiLogIn } from 'react-icons/bi';
import { FaKeyboard, FaHome } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { startPractice, finishPractice } from '../features/userSlice';
import ModalPortal from '../ModalPortal';

import Button from './Button';
import styles from './Menu.module.scss';
import Modal from './Modal';

const cx = classNames.bind(styles);

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
      {isLoggedIn ? (
        <div className={cx('userInfo')}>
          <ul className={cx('userInfo__List')}>
            <li className={cx('userInfo__name')}>{name}님 환영합니다</li>
            <li className={cx('userInfo__lang')}>
              선택한 언어: {selectedLanguage}
            </li>
          </ul>
          {isPracticing ? (
            <div className={cx('menu')}>
              <div className={cx('menu__item')} onClick={handleModalOpen}>
                <div className={cx('message')}>
                  <FaHome /> 홈으로 이동하기
                </div>
              </div>
            </div>
          ) : (
            <div>
              <ul className={cx('menu')}>
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleStartPracticeButtonClick}
                  >
                    <li className={cx('menu__item')}>
                      {item.logo} {item.text}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className={cx('message')}>
          <BiLogIn /> 로그인 해주십시오
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
