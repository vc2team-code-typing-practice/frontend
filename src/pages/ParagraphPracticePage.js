import React, { useEffect, useState, useRef, useMemo } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import { updateUserRecord } from '../features/userSlice';
import ModalPortal from '../ModalPortal';
import {
  keyboardButton,
  prohibitedParagraphKeyCodeList,
} from '../utils/constants';
import getCharacterClass from '../utils/getCharacterClass';

import styles from './ParagraphPracticePage.module.scss';
const cx = classNames.bind(styles);
export default function ParagraphPracticePage({ selectedLanguage, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const numberProblems = useSelector((state) => state.user.numberProblems);
  const paragraphList = useSelector((state) => {
    if (selectedLanguage === 'C') return state.problem.paragraphCList;
    if (selectedLanguage === 'JavaScript') {
      return state.problem.paragraphJavaScriptList;
    }
    if (selectedLanguage === 'Python') return state.problem.paragraphPythonList;
  });
  const name = useSelector((state) => state.user.name);
  const [question, setQuestion] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [paragraphAccuracy, setParagraphAccuracy] = useState(0);
  const [paragraphAccuracySum, setParagraphAccuracySum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingSpeedSum, setTypingSpeedSum] = useState(0);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [incorrectWordCount, setIncorrectWordCount] = useState(0);
  const [score, setScore] = useState(0);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [previousInputIndex, setPreviousInputIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const inputElement = useRef(null);
  const interval = useRef(null);
  const lapsedTime = useRef(0);
  const correctkeyDownCount = useRef(0);
  useEffect(() => {
    paragraphList?.length && nextQuestion();
    inputElement.current.focus();
  }, [paragraphList]);
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
          accuracy: Math.floor(paragraphAccuracySum / numberProblems),
          typingSpeed: Math.floor(typingSpeedSum / numberProblems),
          time: dayjs().format('YYYY.MM.DDTHH:mm'),
          score,
        }),
      );
      setIsShowingModal(true);
      setIsEnded(true);
    }
  }, [attemptCount]);
  useMemo(() => {
    if (currentInput) {
      setParagraphAccuracy(
        (correctWordCount / (correctWordCount + incorrectWordCount)) * 100,
      );
    }
  }, [currentInput]);
  const increaseAttemptCount = () => {
    setAttemptCount((prev) => prev + 1);
  };
  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * 1000) % paragraphList.length;
    setQuestion(paragraphList[randomIndex]);
    setCurrentInput('');
    setCorrectWordCount(0);
    setIncorrectWordCount(0);
    setParagraphAccuracySum((prev) => prev + paragraphAccuracy);
    setTypingSpeedSum((prev) => prev + typingSpeed);
    setParagraphAccuracy(0);
    setTypingSpeed(0);
    setCurrentInputIndex(0);
    setPreviousInputIndex(0);
    setIsStarted(false);
    setIsEnded(false);
    lapsedTime.current = 0;
    correctkeyDownCount.current = 0;
  };
  const startTimer = () => {
    if (!isStarted) {
      setIsStarted(true);
      interval.current = setInterval(() => {
        lapsedTime.current += 1;
        let currentSpeed =
          (correctkeyDownCount.current / lapsedTime.current) * 600;
        currentSpeed = currentSpeed > 0 ? currentSpeed : 0;
        setTypingSpeed(currentSpeed);
      }, 100);
    }
  };
  const finishPractice = (userInput) => {
    if (userInput.length === question.length) {
      if (
        userInput.slice(previousInputIndex, currentInputIndex) ===
        question.slice(previousInputIndex, currentInputIndex)
      ) {
        setScore((prev) => prev + 3);
        clearInterval(interval.current);
        increaseAttemptCount();
        nextQuestion();
      } else {
        clearInterval(interval.current);
        increaseAttemptCount();
        nextQuestion();
      }
    }
  };
  const checkCorrectWords = (currentInput) => {
    const text = question?.replace(' ', '');
    const correctText = currentInput
      .replace(' ', '')
      .split('')
      .filter((value, index) => value === text[index]).length;
    const incorrectText = currentInput
      .replace(' ', '')
      .split('')
      .filter((value, index) => value !== text[index]).length;
    correctkeyDownCount.current = correctText;
    setCorrectWordCount(correctText);
    setIncorrectWordCount(incorrectText);
  };
  const handleChange = (e) => {
    if (e.target.value === 'ㅁ' || e.target.value === 'ㅊ') {
      return;
    }
    startTimer();
    setCurrentInput(e.target.value);
    checkCorrectWords(e.target.value);
    finishPractice(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === keyboardButton.koreanLanguage) {
      e.preventDefault();
      return;
    } else if (prohibitedParagraphKeyCodeList.includes(e.keyCode)) {
      e.preventDefault();
      return;
    } else if (e.keyCode === keyboardButton.tab) {
      e.preventDefault();
      setCurrentInput(e.target.value + '  ');
      setCurrentInputIndex(currentInputIndex + 2);
    } else if (e.keyCode === keyboardButton.enter) {
      if (currentInputIndex === 0) {
        e.preventDefault();
        return;
      } else if (
        currentInput.slice(previousInputIndex, currentInputIndex) ===
        question.slice(previousInputIndex, currentInputIndex)
      ) {
        setPreviousInputIndex(currentInputIndex);
        setCurrentInputIndex(currentInputIndex + 1);
        setScore((prev) => prev + 3);
      } else {
        setPreviousInputIndex(currentInputIndex);
        setCurrentInputIndex(currentInputIndex + 1);
      }
    } else if (e.keyCode === keyboardButton.backspace) {
      if (previousInputIndex === 0) {
        if (currentInputIndex === 0) {
          e.preventDefault();
          return;
        } else {
          setCurrentInputIndex(currentInputIndex - 1);
        }
      } else {
        if (previousInputIndex + 1 === currentInputIndex) {
          e.preventDefault();
          return;
        } else {
          setCurrentInputIndex(currentInputIndex - 1);
        }
      }
    } else if (e.keyCode === keyboardButton.shift) {
      return;
    } else {
      setCurrentInputIndex(currentInputIndex + 1);
    }
  };
  const handleButtonClick = () => {
    setIsShowingModal(false);
    navigate('/');
  };
  return (
    <div className={cx('container')}>
      <div className={cx('container__title')}>
        <h3>긴 글 연습</h3>
      </div>
      <div className={cx('question')}>
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
        <textarea
          className={cx('section__input')}
          ref={inputElement}
          value={currentInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={isEnded}
        />
      </div>
      <div className={cx('result')}>
        <p>
          <span className={cx('result__dataname')}>타수: </span>
          {lapsedTime.current !== 0 ? <>{Math.round(typingSpeed)} 타/분</> : 0}
        </p>
        <p>
          <span className={cx('result__dataname')}>맞은 횟수: </span>
          {correctWordCount}
        </p>
        <p>
          <span className={cx('result__dataname')}>틀린 횟수: </span>
          {incorrectWordCount}
        </p>
        <p>
          <span className={cx('result__dataname')}>현재 정확도: </span>
          {correctWordCount !== 0 &&
            Math.round(
              (correctWordCount / (correctWordCount + incorrectWordCount)) *
                100,
            )}
        </p>
        <p>
          <span className={cx('result__dataname')}>누적 정확도: </span>
          {attemptCount ? Math.floor(paragraphAccuracySum / attemptCount) : 0} %
        </p>
        <p>
          <span className={cx('result__dataname')}>진행도: </span>
          {Math.floor((attemptCount / numberProblems) * 100)} %
        </p>
        <p>
          <span className={cx('result__dataname')}>획득점수: </span>
          {score} 점
        </p>
      </div>
      <Keyboard />
      {isShowingModal && (
        <ModalPortal>
          <Modal
            message={
              <div>
                <h1>문장 연습 결과</h1>
                <p>{name} 님의 연습 결과</p>
                <p>
                  정확도: {Math.floor(paragraphAccuracySum / numberProblems)} %
                </p>
                <p>
                  타수: {Math.floor(typingSpeedSum / numberProblems)}타 / 분
                </p>
                <p>획득점수: {score} 점</p>
                <Button onClick={handleButtonClick}>홈으로 이동하기</Button>
              </div>
            }
            onCloseModal={setIsShowingModal}
          />
        </ModalPortal>
      )}
    </div>
  );
}
