import React, { useState } from 'react';

import classNames from 'classnames/bind';
import { FaFileCode } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  login,
  logout,
  anonymousLogin,
  unsetPracticeMode,
} from '../features/userSlice';
import ModalPortal from '../ModalPortal';

import Button from './Button';
import Modal from './Modal';
import Spinner from './Spinner';
import styles from './Topbar.module.scss';

const cx = classNames.bind(styles);

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.uid);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isPracticing = useSelector((state) => state.user.isPracticing);
  const isUserDataLoading = useSelector(
    (state) => state.user.isUserDataLoading,
  );
  const isRefreshing = useSelector((state) => state.user.isRefreshing);
  const isAnonymousUser = useSelector((state) => state.user.isAnonymousUser);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const handleLoginButtonClick = () => {
    dispatch(login());
  };

  const handleAnonymousLoginButtonClick = () => {
    dispatch(anonymousLogin());
  };

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  const handleLogoClick = () => {
    if (isPracticing) {
      setIsShowingModal(true);
    } else {
      navigate('/');
    }
  };

  const handleMyPageButtonClick = () => {
    navigate(`/users/${userId}`);
  };

  const handleGoBackHomeButtonClick = () => {
    setIsShowingModal(false);
    dispatch(unsetPracticeMode());
    navigate('/');
  };

  const handleResumePracticeButtonClick = () => {
    setIsShowingModal(false);
  };

  return (
    <div className={cx('topbar')}>
      <div className={cx('topbar__wrapper')}>
        <div className={cx('topbar__left')}>
          <span className={cx('topbar__logo')} onClick={handleLogoClick}>
            <FaFileCode /> Code Typing Practice
          </span>
        </div>
        <div className={cx('topbar__right')}>
          {isUserDataLoading || isRefreshing ? (
            <Spinner />
          ) : isLoggedIn ? (
            <div className={cx('topbar__right')}>
              {!isPracticing && !isAnonymousUser && (
                <Button onClick={handleMyPageButtonClick}>My Page</Button>
              )}
              <Button onClick={handleLogoutButtonClick}>Sign Out</Button>
            </div>
          ) : (
            <div className={cx('topbar__right')}>
              <Button onClick={handleLoginButtonClick}>Google SignIn</Button>
              <Button onClick={handleAnonymousLoginButtonClick}>
                Guest SignIn
              </Button>
            </div>
          )}
        </div>
      </div>
      {isShowingModal && (
        <ModalPortal>
          <Modal
            message={
              <div>
                <p>
                  정말로 연습을 종료하시겠습니까? <br />
                </p>
                <div className={cx('gameover__btn')}>
                  <Button onClick={handleGoBackHomeButtonClick}>Yes</Button>
                  <Button onClick={handleResumePracticeButtonClick}>No</Button>
                </div>
              </div>
            }
            onCloseModal={setIsShowingModal}
          ></Modal>
        </ModalPortal>
      )}
    </div>
  );
}
