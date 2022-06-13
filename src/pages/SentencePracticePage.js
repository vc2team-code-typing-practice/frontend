import React, { useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import { finishPractice, updateUserRecord } from '../features/userSlice';
import ModalPortal from '../ModalPortal';
import { keyboardButton, prohibitedKeyCodeList } from '../utils/constants';
import getCharacterClass from '../utils/getCharacterClass';

import styles from './WordPracticePage.module.scss';

const cx = classNames.bind(styles);

export default function SentencePracticePage({ selectedLanguage, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.user.uid);
  const name = useSelector((state) => state.user.name);
  const numberProblems = useSelector((state) => state.user.numberProblems);
  const sentenceList = useSelector((state) => state.problem.sentenceList);

  const [question, setQuestion] = useState('');
  const [questionLength, setQuestionLength] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [currentInput, setCurrentInput] = useState('');
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const [attemptCount, setAttemptCount] = useState(0);

  const [isShowing, setIsShowing] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingSpeedSum, setTypingSpeedSum] = useState(0);

  const [sentenceAccracy, setSentenceAccracy] = useState(0);
  const [sentenceAccracySum, setSentenceAccracySum] = useState(0);

  const [score, setScore] = useState(0);

  const inputElement = useRef(null);
  const lapsedTime = useRef(0);
  const correctkeyDownCount = useRef(0);
  const backSpaceKeyDownCount = useRef(0);
  const interval = useRef(null);

  useEffect(() => {
    sentenceList.length && nextQuestion();
    inputElement.current.focus();
  }, [sentenceList]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useMemo(() => {
    if (attemptCount === numberProblems) {
      dispatch(
        updateUserRecord({
          uid,
          type,
          language: selectedLanguage,
          accuracy: Math.floor((sentenceAccracySum / numberProblems) * 100),
          typingSpeed: Math.floor(typingSpeedSum / numberProblems),
          time: dayjs().format('YYYY-MM-DDTHH:mm'),
          score,
        }),
      );
      setIsShowing(true);
      setIsEnded(true);
    }
  }, [attemptCount]);

  useMemo(() => {
    if (currentInputIndex) {
      setSentenceAccracy(correctkeyDownCount.current / currentInputIndex);
    }
  }, [currentInputIndex]);

  const startTimer = () => {
    interval.current = setInterval(() => {
      lapsedTime.current += 1;

      let currentSpeed =
        ((correctkeyDownCount.current - backSpaceKeyDownCount.current) /
          lapsedTime.current) *
        600;

      currentSpeed = currentSpeed > 0 ? currentSpeed : 0;
      setTypingSpeed(currentSpeed);
    }, 100);
  };

  const nextQuestion = () => {
    clearInterval(interval.current);
    setIsTimerRunning(false);

    const randomIndex = Math.floor(Math.random() * 1000) % sentenceList.length;
    setQuestion(sentenceList[randomIndex]);
    setQuestionLength(sentenceList[randomIndex]?.length);
    setQuestionIndex(0);

    setCurrentInput('');
    setCurrentInputIndex(0);

    if (sentenceAccracy === 1) {
      setScore((prev) => prev + 3);
    }

    setSentenceAccracySum((prev) => prev + sentenceAccracy);
    setTypingSpeedSum((prev) => prev + typingSpeed);
    setTypingSpeed(0);

    lapsedTime.current = 0;
    correctkeyDownCount.current = 0;
    backSpaceKeyDownCount.current = 0;
  };

  const increaseAttemptCount = () => {
    setAttemptCount((prev) => prev + 1);
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

        backSpaceKeyDownCount.current += 1;

        if (
          question[questionIndex - 1] === currentInput[currentInputIndex - 1]
        ) {
          correctkeyDownCount.current -= 1;
        }
      }
    } else if (event.keyCode === keyboardButton.shift) {
      return;
    } else {
      setQuestionIndex((prev) => prev + 1);
      setCurrentInputIndex((prev) => prev + 1);
    }

    if (question[questionIndex] === event.key) {
      correctkeyDownCount.current += 1;
    }
  };

  const handleChange = (event) => {
    setCurrentInput(event.target.value);

    if (currentInputIndex >= questionLength) {
      increaseAttemptCount();
      nextQuestion();
    }
  };

  const handleButtonClick = () => {
    setIsShowing(false);
    dispatch(finishPractice());
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <h3>짧은 글 연습</h3>
      <div>
        {question?.split('').map((character, index) => (
          <span
            key={index}
            className={getCharacterClass(currentInput, index, character)}
          >
            {character}
          </span>
        ))}
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
      <p>타수: {Math.floor(typingSpeed)} 타</p>
      <p>현재 정확도: {Math.floor(sentenceAccracy * 100)} %</p>
      <p>
        누적 정확도:{' '}
        {attemptCount
          ? Math.floor((sentenceAccracySum / attemptCount) * 100)
          : 0}{' '}
        %
      </p>
      <p>진행도: {Math.floor((attemptCount / numberProblems) * 100)} %</p>
      <p>획득점수: {score} 점</p>
      <Keyboard />

      {isShowing && (
        <ModalPortal>
          <Modal
            message={
              <div>
                <h1>문장 연습 결과</h1>
                <p>{name} 님의 기록은</p>
                <p>
                  정확도:{' '}
                  {Math.floor((sentenceAccracySum / numberProblems) * 100)} %
                </p>
                <p>타수: {Math.floor(typingSpeedSum / numberProblems)} 타</p>
                <p>획득점수: {score} 점</p>
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
