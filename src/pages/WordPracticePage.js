import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';

import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import correct from '../audios/correct.mp3';
import wrong from '../audios/wrong.mp3';
import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import ModalPortal from '../ModalPortal';
import checkKoreanInput from '../utils/checkKoreanInput';
import { keyboardButton, prohibitedKeyCodeList } from '../utils/constants';
import getCharacterClass from '../utils/getCharacterClass';

import styles from './WordPracticePage.module.scss';

const cx = classNames.bind(styles);

export default function WordPracticePage() {
  const navigate = useNavigate();

  const wordList = useSelector((state) => state.problem.wordList);
  const isTurnedOn = useSelector((state) => state.user.soundEffects);
  const name = useSelector((state) => state.user.name);
  const numberProblems = useSelector((state) => state.user.numberProblems);
  const isColorWeaknessUser = useSelector(
    (state) => state.user.isColorWeaknessUser,
  );

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

  const currentSpanTag = isColorWeaknessUser
    ? 'currentSpan_colorWeakness'
    : 'currentSpan';

  let currentQuestionId = document.getElementById(questionIndex);

  useLayoutEffect(() => {
    currentQuestionId = document.getElementById(questionIndex);

    currentQuestionId?.classList.add(cx(currentSpanTag));
    return () => {
      currentQuestionId?.classList.remove(cx(currentSpanTag));
    };
  });

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
      currentQuestionId.classList.remove(cx(currentSpanTag));

      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1);
        setCurrentInputIndex((prev) => prev - 1);
      }
    } else if (event.keyCode === keyboardButton.shift) {
      return;
    } else {
      setQuestionIndex((prev) => prev + 1);
      setCurrentInputIndex((prev) => prev + 1);
      currentQuestionId?.classList.add(currentSpanTag);
    }
  };

  const handleChange = (event) => {
    if (checkKoreanInput(event.target.value)) {
      alert('???????????? ????????????!');
      return;
    }

    setCurrentInput(event.target.value);

    if (currentInputIndex >= questionLength) {
      checkAnswer(event.target.value);
    }
  };

  const handleButtonClick = () => {
    setIsShowingModal(false);
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('container__title')}>
        <h3>?????? ??????</h3>
      </div>

      <div className={cx('result')}>
        <ul className={cx('result__data')}>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>?????????</span>
            <span className={cx('data')} data-testid="accuracy">
              {correctCount / attemptCount
                ? Math.floor((correctCount / attemptCount) * 100)
                : 0}{' '}
              %
            </span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>?????????</span>
            <span className={cx('data')}>{incorrectCount} ???</span>
          </li>
          <li className={cx('result__list')}>
            <span className={cx('data_name')}>?????????</span>
            <span className={cx('data')}>
              {Math.floor((attemptCount / numberProblems) * 100)} %
            </span>
          </li>
        </ul>
      </div>

      <div className={cx('question')} data-testid="question">
        <span className={cx('question__character')}>
          {question?.split('').map((character, index) => (
            <span
              key={index}
              id={index}
              className={getCharacterClass(
                currentInput,
                index,
                character,
                isColorWeaknessUser,
              )}
            >
              {character}
            </span>
          ))}
        </span>
      </div>

      <div className={cx('section')}>
        <input
          data-testid="input"
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
                <h1 className={cx('practice_result__title')}>?????? ?????? ??????</h1>
                <div className={cx('practice_result__content')}>
                  <p className={cx('practice_result__content__item')}>
                    {name} ?????? ?????????
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    ????????? : {Math.round((correctCount / numberProblems) * 100)}{' '}
                    %
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    ????????? : {incorrectCount} ???
                  </p>
                  <p className={cx('practice_result__content__item')}>
                    ???????????? : {Math.floor(lapsedTime.current / 60)} ???{' '}
                    {lapsedTime.current % 60} ???
                  </p>
                </div>
                <div className={cx('practice_result__button')}>
                  <Button onClick={handleButtonClick}>????????? ????????????</Button>
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
