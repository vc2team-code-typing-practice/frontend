import React, { useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import correct from '../audios/correct.mp3';
import wrong from '../audios/wrong.mp3';
import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import { unsetPracticeMode, updateUserRecord } from '../features/userSlice';
import ModalPortal from '../ModalPortal';
import checkKoreanInput from '../utils/checkKoreanInput';
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
  const isTurnedOn = useSelector((state) => state.user.soundEffects);
  const sentenceList = useSelector((state) => state.problem.sentenceList);
  const isAnonymousUser = useSelector((state) => state.user.isAnonymousUser);

  const [question, setQuestion] = useState('');
  const [questionLength, setQuestionLength] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [currentInput, setCurrentInput] = useState('');
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const [attemptCount, setAttemptCount] = useState(0);

  const [isShowingModal, setIsShowingModal] = useState(false);
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

  let currentQuestionId = document.getElementById(questionIndex);

  useEffect(() => {
    currentQuestionId = document.getElementById(questionIndex);

    currentQuestionId?.classList.add(cx('currentSpan'));

    return () => {
      currentQuestionId?.classList.remove(cx('currentSpan'));
    };
  }, [questionIndex]);

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
      if (!isAnonymousUser) {
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
      }
      setIsShowingModal(true);
      setIsEnded(true);
    }
  }, [attemptCount, isAnonymousUser]);

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
      if (isTurnedOn) {
        const correctSound = new Audio(correct);
        correctSound.play();
      }

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
    if (checkKoreanInput(event.key) || event.key === 'Process') {
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
      currentQuestionId?.classList.add('current');
    }

    if (question[questionIndex] === event.key) {
      correctkeyDownCount.current += 1;
    }
  };

  const handleChange = (event) => {
    if (checkKoreanInput(event.target.value)) {
      alert('영문키로 바꾸세요!');
      return;
    }

    setCurrentInput(event.target.value);

    if (currentInputIndex >= questionLength) {
      increaseAttemptCount();
      nextQuestion();
    }
  };

  const handleButtonClick = () => {
    setIsShowingModal(false);
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('container__title')}>
        <h3>짧은 글 연습</h3>
      </div>

      <div className={cx('result')}>
        <ul className={cx('result__data')}>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>타수 : </span>
            <span className={cx('data')}>{Math.floor(typingSpeed)} 타</span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>현재 정확도 :</span>
            <span className={cx('data')}>
              {Math.floor(sentenceAccracy * 100)} %
            </span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>누적 정확도 : </span>
            <span className={cx('data')}>
              {attemptCount
                ? Math.floor((sentenceAccracySum / attemptCount) * 100)
                : 0}{' '}
              %
            </span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>진행도 : </span>
            <span className={cx('data')}>
              {Math.floor((attemptCount / numberProblems) * 100)} %
            </span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>획득점수 : </span>
            <span className={cx('data')}>{score} 점</span>
          </li>
        </ul>
      </div>

      <div className={cx('question')}>
        <span className={cx('question__sentence_character')}>
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
                <h1 className={cx('practice_result__title')}>문장 연습 결과</h1>
                <div className={cx('practice_result__content')}>
                  <p
                    className={cx(
                      'practice_result__content__item',
                      'practice_result__content__user',
                    )}
                  >
                    {name} 님의 기록은
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    정확도 :{' '}
                    {Math.floor((sentenceAccracySum / numberProblems) * 100)} %
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    타수 : {Math.floor(typingSpeedSum / numberProblems)} 타
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    획득점수 : {score} 점
                  </p>
                </div>
                <div className={cx('practice_result__button')}>
                  <Button onClick={handleButtonClick}>홈으로 이동하기</Button>
                </div>
              </div>
            }
            onCloseModal={setIsShowingModal}
            redirectLink="/"
          />
        </ModalPortal>
      )}
    </div>
  );
}
