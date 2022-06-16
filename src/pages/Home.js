import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Modal from '../components/Modal';
import { unsetPracticeMode, setPracticeMode } from '../features/userSlice';
import ModalPortal from '../ModalPortal';

import styles from './Home.module.scss';
const cx = classNames.bind(styles);

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isShowing, setIsShowing] = useState(false);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    dispatch(unsetPracticeMode());
  }, []);

  const handleModalOpen = (lang, event) => {
    setLanguage(lang);
    setIsShowing(true);
  };

  const handleWordButtnoCLick = () => {
    dispatch(setPracticeMode());
    navigate(`/practice/${language}/word`);
  };

  const handleSentenceButtnoCLick = () => {
    dispatch(setPracticeMode());
    navigate(`/practice/${language}/sentence`);
  };

  const handleParagraphButtnoCLick = () => {
    dispatch(setPracticeMode());
    navigate(`/practice/${language}/paragraph`);
  };

  return (
    <div className={cx('home')}>
      <header className={cx('home__header')}>
        Choose What You Want To Practice!
      </header>
      <section>
        <article
          onClick={(e) => {
            handleModalOpen('C', e);
          }}
        >
          <div className={cx('home__content')}>
            <div className={cx('home__content__title')}>
              <h2>C</h2>
            </div>
            <div className={cx('home__content__item')}>
              <p>
                C언어는 현재 사용되고 있는 거의 모든 컴퓨터 시스템에서 사용할 수
                있는 프로그래밍 언어입니다. 현재 널리 사용되는 주요 운영체제의
                커널은 대부분 C언어를 이용해 구현되어 있습니다. 이처럼 C언어는
                시스템 프로그래밍에 가장 잘 어울리지만, 응용 프로그래밍에도 많이
                사용되는 프로그래밍 언어입니다.
              </p>
            </div>
          </div>
        </article>
        <article
          onClick={(e) => {
            handleModalOpen('Python', e);
          }}
        >
          <div className={cx('home__content')}>
            <div className={cx('home__content__title')}>
              <h2>Python</h2>
            </div>
            <div className={cx('home__content__item')}>
              <p>
                파이썬은 1989년 귀도 반 로썸(Guido van Rossum)에 의해 개발된
                고급 프로그래밍 언어로, 2018년 현재 실무와 교육 양쪽 모두에서
                엄청난 인기를 끌고 있는 언어입니다. 배우기 쉬운 동시에 속도도
                빠르며 다양한 확장성을 가진 파이썬은 그 중요성을 인정받아 4차
                산업혁명에 대비한 대한민국 2015년 개정 교육과정에
                포함되었습니다.
              </p>
            </div>
          </div>
        </article>
        <article
          onClick={(e) => {
            handleModalOpen('JavaScript', e);
          }}
        >
          <div className={cx('home__content')}>
            <div className={cx('home__content__title')}>
              <h2>JavaScript</h2>
            </div>
            <div className={cx('home__content__item')}>
              <p>
                자바스크립트(JavaScript)는 객체(object) 기반의 스크립트
                언어입니다. HTML로는 웹의 내용을 작성하고, CSS로는 웹을
                디자인하며, 자바스크립트로는 웹의 동작을 구현할 수 있습니다.
                자바스크립트는 주로 웹 브라우저에서 사용되나, Node.js와 같은
                프레임워크를 사용하면 서버 측 프로그래밍에서도 사용할 수
                있습니다. 현재 컴퓨터나 스마트폰 등에 포함된 대부분의 웹
                브라우저에는 자바스크립트 인터프리터가 내장되어 있습니다.
              </p>
            </div>
          </div>
        </article>
      </section>

      {isShowing && (
        <ModalPortal>
          <Modal
            message={
              <div className={cx('selectPracticeLang')}>
                <div className={cx('selectPracticeLang__btn')}>
                  <Button onClick={handleWordButtnoCLick}>낱말 연습</Button>
                </div>
                <div className={cx('selectPracticeLang__btn')}>
                  <Button onClick={handleSentenceButtnoCLick}>
                    짧은 글 연습
                  </Button>
                </div>
                <div className={cx('selectPracticeLang__btn')}>
                  <Button onClick={handleParagraphButtnoCLick}>
                    긴 글 연습
                  </Button>
                </div>
              </div>
            }
            onCloseModal={setIsShowing}
          />
        </ModalPortal>
      )}
    </div>
  );
}
