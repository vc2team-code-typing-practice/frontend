import React, { useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import correct from '../audios/correct.mp3';
import wrong from '../audios/wrong.mp3';
import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import { finishPractice } from '../features/userSlice';
import ModalPortal from '../ModalPortal';
import checkKoreanInput from '../utils/checkKoreanInput';
import { keyboardButton, prohibitedKeyCodeList } from '../utils/constants';
import getCharacterClass from '../utils/getCharacterClass';

import styles from './WordPracticePage.module.scss';

const cx = classNames.bind(styles);

export default function WordPracticePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wordList = useSelector((state) => state.problem.wordList);
  const isTurnedOn = useSelector((state) => state.user.soundEffects);
  const name = useSelector((state) => state.user.name);
  const numberProblems = useSelector((state) => state.user.numberProblems);

  const [question, setQuestion] = useState('');
  const [questionLength, setQuestionLength] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [currentInput, setCurrentInput] = useState('');
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setInCorrectCount] = useState(0);

  const [attemptCount, setAttemptCount] = useState(0);

  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const inputElement = useRef(null);
  const lapsedTime = useRef(0);
  const interval = useRef(null);

  let currentQuestionId = document.getElementById(questionIndex);

  useEffect(() => {
    currentQuestionId = document.getElementById(questionIndex);

    currentQuestionId?.classList.add(cx('currentSpan'));

    return () => {
      currentQuestionId?.classList.remove(cx('currentSpan'));
    };
  }, [questionIndex]);

  useEffect(() => {
    nextQuestion();
    inputElement.current.focus();
  }, [wordList]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useMemo(() => {
    if (attemptCount === numberProblems) {
      clearInterval(interval.current);
      setIsShowingModal(true);
      setIsEnded(true);
    }
  }, [attemptCount]);

  const startTimer = () => {
    interval.current = setInterval(() => {
      lapsedTime.current += 1;
    }, 1000);
  };

  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * 1000) % wordList.length;
    setQuestion(wordList[randomIndex]);
    setQuestionIndex(0);
    setQuestionLength(wordList[randomIndex]?.length);
    setCurrentInput('');
  };

  const checkAnswer = (answer) => {
    if (question === answer.trim()) {
      if (isTurnedOn) {
        const correctSound = new Audio(correct);
        correctSound.play();
      }

      setCorrectCount((prev) => prev + 1);
    } else {
      if (isTurnedOn) {
        const wrongSound = new Audio(wrong);
        wrongSound.play();
      }

      setInCorrectCount((prev) => prev + 1);
    }

    setAttemptCount((prev) => prev + 1);

    nextQuestion();
    setQuestionIndex(0);
    setCurrentInputIndex(0);
    setCurrentInput('');
  };

  const handleKeyDown = (event) => {
    if (checkKoreanInput(event.key)) {
      return;
    }

    if (
      prohibitedKeyCodeList.includes(event.keyCode) ||
      event.keyCode === keyboardButton.enter
    ) {
      event.preventDefault();
      return;
    }

    if (!isTimerRunning) {
      startTimer();
      setIsTimerRunning(true);
    }

    if (event.keyCode === keyboardButton.spacebar) {
      setQuestionIndex((prev) => prev + 1);
      setCurrentInputIndex((prev) => prev + 1);
    } else if (event.keyCode === keyboardButton.backspace) {
      currentQuestionId.classList.remove(cx('currentSpan'));

      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1);
        setCurrentInputIndex((prev) => prev - 1);
      }
    } else if (event.keyCode === keyboardButton.shift) {
      return;
    } else {
      setQuestionIndex((prev) => prev + 1);
      setCurrentInputIndex((prev) => prev + 1);
      currentQuestionId?.classList.add('current');
    }
  };

  const handleChange = (e) => {
    if (checkKoreanInput(event.target.value)) {
      alert('영문키로 바꾸세요!');
      return;
    }

    setCurrentInput(e.target.value);

    if (currentInputIndex >= questionLength) {
      checkAnswer(e.target.value);
    }
  };

  const handleButtonClick = () => {
    setIsShowingModal(false);
    dispatch(finishPractice());
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('container__title')}>
        <h3>낱말 연습</h3>
      </div>

      <div className={cx('result')}>
        <ul className={cx('result__data')}>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>정확도</span>
            <span className={cx('data')}>
              {correctCount / attemptCount
                ? Math.floor((correctCount / attemptCount) * 100)
                : 0}{' '}
              %
            </span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>오타수</span>
            <span className={cx('data')}>{incorrectCount} 개</span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>진행도</span>
            <span className={cx('data')}>
              {Math.floor((attemptCount / numberProblems) * 100)} %
            </span>
          </li>
        </ul>
      </div>

      <div className={cx('question')}>
        <span className={cx('question__character')}>
          {question?.split('').map((character, index) => (
            <span
              key={index}
              id={index}
              className={getCharacterClass(currentInput, index, character)}
            >
              {character}
            </span>
          ))}
        </span>
      </div>

      <div className={cx('section')}>
        <input
          ref={inputElement}
          className={cx('section__input')}
          onKeyDown={handleKeyDown}
          type="text"
          value={currentInput}
          onChange={handleChange}
          disabled={isEnded}
        />
      </div>

      <Keyboard isGameEnd={isEnded} />

      {isShowingModal && (
        <ModalPortal>
          <Modal
            message={
              <div className={cx('practice_result')}>
                <h1 className={cx('practice_result__title')}>낱말 연습 결과</h1>
                <div className={cx('practice_result__content')}>
                  <p className={cx('practice_result__content__item')}>
                    {name} 님의 기록은
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    정확도 : {Math.round((correctCount / numberProblems) * 100)}{' '}
                    %
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    오타수 : {incorrectCount} 개
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    소요시간 : {Math.floor(lapsedTime.current / 60)} 분{' '}
                    {lapsedTime.current % 60} 초
                  </p>
                </div>
                <div className={cx('practice_result__button')}>
                  <Button onClick={handleButtonClick}>홈으로 이동하기</Button>
                </div>
              </div>
            }
            onCloseModal={setIsShowingModal}
          />
        </ModalPortal>
      )}
    </div>
  );
}
