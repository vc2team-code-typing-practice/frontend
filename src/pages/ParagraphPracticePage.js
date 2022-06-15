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
import checkKoreanInput from '../utils/checkKoreanInput';
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
  const name = useSelector((state) => state.user.name);
  const numberProblems = useSelector((state) => state.user.numberProblems);
  const paragraphList = useSelector((state) => state.problem.paragraphList);
  const isAnonymousUser = useSelector((state) => state.user.isAnonymousUser);

  const [question, setQuestion] = useState('');

  const [currentInput, setCurrentInput] = useState('');
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const [attemptCount, setAttemptCount] = useState(0);

  const [paragraphAccuracy, setParagraphAccuracy] = useState(0);
  const [paragraphAccuracySum, setParagraphAccuracySum] = useState(0);

  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingSpeedSum, setTypingSpeedSum] = useState(0);

  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [incorrectWordCount, setIncorrectWordCount] = useState(0);
  const [score, setScore] = useState(0);

  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const inputElement = useRef(null);
  const interval = useRef(null);
  const lapsedTime = useRef(0);
  const correctkeyDownCount = useRef(0);

  let currentQuestionId = document.getElementById(currentInputIndex);

  useEffect(() => {
    currentQuestionId = document.getElementById(currentInputIndex);

    currentQuestionId?.classList.add(cx('currentSpan'));

    return () => {
      currentQuestionId?.classList.remove(cx('currentSpan'));
    };
  }, [currentInputIndex, currentQuestionId]);

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
      if (!isAnonymousUser) {
        dispatch(
          updateUserRecord({
            uid,
            type,
            language: selectedLanguage,
            accuracy: Math.floor(paragraphAccuracySum / numberProblems),
            typingSpeed: Math.floor(typingSpeedSum / numberProblems),
            time: dayjs().format('YYYY-MM-DDTHH:mm'),
            score,
          }),
        );
      }

      setIsShowingModal(true);
      setIsEnded(true);
    }
  }, [attemptCount, isAnonymousUser]);

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
      if (paragraphAccuracy >= 100) {
        setScore((prev) => prev + 10);

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
    if (checkKoreanInput(e.target.value)) {
      alert('영문키로 바꾸세요!');

      return;
    }

    startTimer();
    setCurrentInput(e.target.value);
    checkCorrectWords(e.target.value);
    finishPractice(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (checkKoreanInput(e.key)) {
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
      } else {
        setCurrentInputIndex(currentInputIndex + 1);
        currentQuestionId?.classList.add('current');
      }
    } else if (e.keyCode === keyboardButton.backspace) {
      if (currentInputIndex === 0) {
        e.preventDefault();
        return;
      } else {
        setCurrentInputIndex(currentInputIndex - 1);
        currentQuestionId.classList.remove(cx('currentSpan'));
      }
    } else if (e.keyCode === keyboardButton.shift) {
      return;
    } else {
      setCurrentInputIndex(currentInputIndex + 1);
      currentQuestionId?.classList.add('current');
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
        <h3>긴 글 연습</h3>
      </div>
      <div className={cx('question')}>
        {question?.split('').map((character, index) => (
          <span
            key={index}
            id={index}
            className={getCharacterClass(currentInput, index, character)}
          >
            {character}
          </span>
        ))}
      </div>
      <div className={cx('section')}>
        <textarea
          className={cx('section__textarea')}
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
          <span className={cx('result__data')}>
            {lapsedTime.current !== 0 ? (
              <>{Math.round(typingSpeed)} 타/분</>
            ) : (
              0
            )}
          </span>
        </p>
        <p>
          <span className={cx('result__dataname')}>획득점수: </span>
          <span className={cx('result__data')}>{score} 점</span>
        </p>
        <p>
          <span className={cx('result__dataname')}>현재 정확도: </span>
          <span className={cx('result__data')}>
            {correctWordCount !== 0 &&
              Math.round(
                (correctWordCount / (correctWordCount + incorrectWordCount)) *
                  100,
              )}
            %
          </span>
        </p>
        <p>
          <span className={cx('result__dataname')}>누적 정확도: </span>
          {attemptCount ? Math.floor(paragraphAccuracySum / attemptCount) : 0} %
        </p>
        <p>
          <span className={cx('result__dataname')}>진행도: </span>
          {Math.floor((attemptCount / numberProblems) * 100)} %
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
