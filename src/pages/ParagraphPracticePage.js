import React, { useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import ModalPortal from '../ModalPortal';
import getCharacterClass from '../utils/getCharacterClass';

import styles from './WordPracticePage.module.scss';

export default function ParagraphPracticePage({ languages }) {
  const navigate = useNavigate();

  const paragraphList = useSelector((state) => {
    if (languages === 'C') return state.problem.paragraphCList;
    if (languages === 'JavaScript') {
      return state.problem.paragraphJavaScriptList;
    }
    if (languages === 'Python') return state.problem.paragraphPythonList;
  });
  const name = useSelector((state) => state.user.name);

  const [question, setQuestion] = useState('');
  const [currentInput, setCurrentInput] = useState('');

  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [incorrectWordCount, setIncorrectWordCount] = useState(0);

  const [second, setSecond] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);

  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const inputElement = useRef(null);
  const interval = useRef(null);
  const lapsedTime = useRef(0);

  const keyBoardButton = {
    tab: 9,
  };

  useEffect(() => {
    nextQuestion();
  }, [paragraphList]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * 10) % paragraphList.length;
    setQuestion(paragraphList[randomIndex]);

    setCurrentInput('');

    setSecond(0);
    setTypingSpeed(0);

    setCorrectWordCount(0);
    setIncorrectWordCount(0);

    setIsStarted(false);
    setIsEnded(false);

    lapsedTime.current = 0;
  };

  const startTimer = () => {
    if (!isStarted) {
      setIsStarted(true);

      interval.current = setInterval(() => {
        lapsedTime.current += 1;
        setSecond((previousSecond) => previousSecond + 1);
      }, 1000);
    }
  };

  const finishPractice = (userInput) => {
    if (userInput.length === question.length) {
      clearInterval(interval.current);

      setIsEnded(true);
      setIsShowingModal(true);
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

    setCorrectWordCount(correctText);
    setIncorrectWordCount(incorrectText);
  };

  const handleChange = (e) => {
    startTimer();

    finishPractice(e.target.value);

    setCurrentInput(e.target.value);
    checkCorrectWords(e.target.value);

    setTypingSpeed(correctWordCount / (second / 60));
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === keyBoardButton.tab) {
      e.preventDefault();

      setCurrentInput(e.target.value + '\t');
    }
  };

  const handleButtonClick = () => {
    setIsShowingModal(false);

    navigate('/');
  };

  return (
    <div>
      <div>
        {question?.split('').map((character, index) => (
          <span
            key={index}
            className={getCharacterClass(currentInput, index, character)}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {character}
          </span>
        ))}
      </div>
      <div>
        <textarea
          ref={inputElement}
          value={currentInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={isEnded}
          style={{ width: '100%', height: '100px' }}
        />
      </div>
      <div>
        <div>
          {correctWordCount !== 0 && second !== 0 && (
            <div>{Math.round(typingSpeed)} wpm</div>
          )}
        </div>
        <p>맞은 횟수{correctWordCount}</p>
        <p>틀린 횟수{incorrectWordCount}</p>
        {correctWordCount !== 0 && incorrectWordCount !== 0 && (
          <p>
            Accuracy:
            {Math.round(
              (correctWordCount / (correctWordCount + incorrectWordCount)) *
                100,
            )}
          </p>
        )}
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
                  정확도:{' '}
                  {Math.round(
                    (correctWordCount /
                      (correctWordCount + incorrectWordCount)) *
                      100,
                  )}
                  %
                </p>
                <p>평균 타자속도: {Math.floor(typingSpeed)} 타 / 분</p>
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
