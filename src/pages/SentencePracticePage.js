import React, { useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import { finishPractice } from '../features/userSlice';
import ModalPortal from '../ModalPortal';

import styles from './WordPracticePage.module.scss';

const cx = classNames.bind(styles);

export default function SentencePracticePage({ selectedLanguage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sentenceList = useSelector((state) => state.problem.sentenceList);
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

  const [typingSpeed, setTypingSpeed] = useState(0);
  const [totalTypingSpeed, setTotalTypingSpeed] = useState(0);

  const inputElement = useRef(null);
  const lapsedTime = useRef(0);
  const correctkeyDownCount = useRef(0);
  const backSpaceKeyDownCount = useRef(0);
  const interval = useRef(null);

  useEffect(() => {
    nextQuestion();
    inputElement.current.focus();
  }, [sentenceList]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useMemo(() => {
    if (attemptCount === numberProblems) {
      console.log(selectedLanguage);
      console.log(Math.floor(totalTypingSpeed / numberProblems));
      console.log(
        Math.round(((numberProblems - incorrectCount) / numberProblems) * 100),
      );
      setIsShowing(true);
      setIsEnded(true);
    }
  }, [attemptCount]);

  const keyBoardButton = {
    spaceBar: 32,
    backSpace: 8,
    shift: 16,
    enter: 13,
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight: 39,
    arrowDown: 40,
  };

  const startTimer = () => {
    interval.current = setInterval(() => {
      lapsedTime.current += 1;
    }, 1000);
  };

  const nextQuestion = () => {
    clearInterval(interval.current);
    setIsTimerRunning(false);

    const randomIndex = Math.floor(Math.random() * 10) % sentenceList.length;
    setQuestion(sentenceList[randomIndex]);
    setQuestionLength(sentenceList[randomIndex]?.length);
    setCurrentInput('');

    let currentSpeed =
      ((correctkeyDownCount.current - backSpaceKeyDownCount.current) /
        lapsedTime.current) *
      60;

    currentSpeed = currentSpeed > 0 ? currentSpeed : 0;

    setTypingSpeed(currentSpeed);
    setTotalTypingSpeed((acc) => acc + currentSpeed);

    lapsedTime.current = 0;
    correctkeyDownCount.current = 0;
    backSpaceKeyDownCount.current = 0;
  };

  const checkAnswer = (answer) => {
    if (question === answer.trim()) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setInCorrectCount((prev) => prev + 1);
    }

    setAttemptCount((prev) => prev + 1);

    nextQuestion();
    setQuestionIndex(0);
    setCurrentInputIndex(0);
    setCurrentInput('');
  };

  const handleKeyDown = ({ keyCode, key }) => {
    if (!isTimerRunning) {
      startTimer();
      setIsTimerRunning(true);
    }

    if (keyCode === keyBoardButton.spaceBar) {
      setQuestionIndex((prev) => prev + 1);
      setCurrentInputIndex((prev) => prev + 1);
    } else if (keyCode === keyBoardButton.backSpace) {
      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1);
        setCurrentInputIndex((prev) => prev - 1);
        backSpaceKeyDownCount.current += 1;
      }
    } else if (
      keyCode === keyBoardButton.shift ||
      keyCode === keyBoardButton.arrowLeft ||
      keyCode === keyBoardButton.arrowDown ||
      keyCode === keyBoardButton.arrowRight ||
      keyCode === keyBoardButton.arrowUp
    ) {
      return;
    } else if (keyCode === keyBoardButton.enter) {
      nextQuestion();
      setInCorrectCount((prev) => prev + 1);
      setAttemptCount((prev) => prev + 1);
    } else {
      setQuestionIndex((prev) => prev + 1);
      setCurrentInputIndex((prev) => prev + 1);
    }

    if (question[questionIndex] === key) {
      correctkeyDownCount.current += 1;
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
      <h1>문장 연습</h1>
      <div>
        {question?.split('').map((character, index) => (
          <span key={index}> {character} </span>
        ))}
      </div>
      <div>{question}</div>

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

      <p>맞은 횟수{correctCount}</p>
      <p>틀린 횟수{incorrectCount}</p>
      <p>도전 횟수{attemptCount}</p>
      <p>현재 타자{typingSpeed}</p>
      <p>누적 {totalTypingSpeed}</p>
      <div className={cx('section')}>
        <div className="columns">
          <div className="">
            <div className="">Accuracy :</div>
            <p className="">
              {Math.round(
                ((numberProblems - incorrectCount) / numberProblems) * 100,
              )}{' '}
              %
            </p>
          </div>
        </div>
      </div>

      <Keyboard />

      {isShowing && (
        <ModalPortal>
          <Modal
            message={
              <div>
                <h1>문장 연습 결과</h1>
                <p>{name} 님의 연습 결과</p>
                <p>
                  정확도:{' '}
                  {Math.round(
                    ((numberProblems - incorrectCount) / numberProblems) * 100,
                  )}{' '}
                  %
                </p>
                <p>
                  평균 타자속도: {Math.floor(totalTypingSpeed / numberProblems)}{' '}
                  타 / 분
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
