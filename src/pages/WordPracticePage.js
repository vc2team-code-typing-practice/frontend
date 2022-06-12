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

  const [isShowing, setIsShowing] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const inputElement = useRef(null);
  const lapsedTime = useRef(0);
  const interval = useRef(null);

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
      setIsShowing(true);
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
      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1);
        setCurrentInputIndex((prev) => prev - 1);
      }
    } else if (event.keyCode === keyboardButton.shift) {
      return;
    } else {
      setQuestionIndex((prev) => prev + 1);
      setCurrentInputIndex((prev) => prev + 1);
    }
  };

  const handleChange = (e) => {
    setCurrentInput(e.target.value);

    if (currentInputIndex >= questionLength) {
      checkAnswer(e.target.value);
    }
  };

  const handleButtonClick = () => {
    setIsShowing(false);
    dispatch(finishPractice());
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('container__title')}>
        <h3>낱말 연습</h3>
      </div>

      <div className={cx('question')}>
        <span className={cx('question__character')}>
          {question?.split('').map((character, index) => (
            <span
              key={index}
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

      <div className={cx('result')}>
        <div className={cx('result__data')}>
          <p>
            정확도:{' '}
            {correctCount / attemptCount
              ? Math.floor((correctCount / attemptCount) * 100)
              : 0}{' '}
            %
          </p>
          <p>오타수: {incorrectCount} 개</p>
          <p>진행도: {Math.floor((attemptCount / numberProblems) * 100)} %</p>
        </div>
      </div>

      <Keyboard />

      {isShowing && (
        <ModalPortal>
          <Modal
            message={
              <div>
                <h1>낱말 연습 결과</h1>
                <p>{name} 님의 기록은</p>
                <p>
                  정확도: {Math.round((correctCount / numberProblems) * 100)} %
                </p>
                <p>오타수: {incorrectCount} 개</p>
                <p>
                  소요시간: {Math.floor(lapsedTime.current / 60)} 분{' '}
                  {lapsedTime.current % 60} 초
                </p>
                <Button onClick={handleButtonClick}>홈으로 이동하기</Button>
              </div>
            }
            onCloseModal={setIsShowing}
          />
        </ModalPortal>
      )}
    </div>
  );
}
