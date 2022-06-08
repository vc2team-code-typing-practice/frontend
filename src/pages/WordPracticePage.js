/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { BiTimer } from 'react-icons/bi';

import styles from './WordPracticePage.module.scss';

const cx = classNames.bind(styles);
const SECONDS = 30;

export default function WordPracticePage({ words, languages }) {
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState([]);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState('');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState('waiting');
  const textInput = useRef(null);

  const wordlist = words?.[0];
  const selected = wordlist?.[languages];

  function start() {
    if (status === 'finished') {
      setCurrWordIndex(0);
      setCorrect(0);
      setInCorrect(0);
      setCurrCharIndex(-1);
      setCurrChar('');
    }

    if (status !== 'started') {
      setStatus('started');

      let interval = setInterval(() => {
        setCountDown((prevCountDown) => {
          if (prevCountDown === 0) {
            clearInterval(interval);
            setStatus('finished');
            setCurrInput('');
            return SECONDS;
          } else {
            return prevCountDown - 1;
          }
        });
      }, 1000);
    }
  }

  function handleKeyDown({ keyCode, key }) {
    if (keyCode === 32) {
      checkMatch();
      setCurrInput('');
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar('');
    } else if (keyCode === 16) {
      return;
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = selected[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();

    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== 'finished'
    ) {
      if (char === currChar) {
        return cx('correct');
      } else {
        return cx('wrong');
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= selected[currWordIndex].length
    ) {
      return cx('wrong');
    } else {
      return '';
    }
  }

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus();
    }
  }, [status]);

  return (
    <div>
      <div className={cx('timer')}>
        <div className={cx('timer__title')}>
          Word Practice
          <div className={cx('timer__logo')}>
            <BiTimer /> {countDown}
          </div>
        </div>
      </div>

      <div className={cx()}>
        <div className={cx('section', 'section__control')}>
          <input
            ref={textInput}
            disabled={status !== 'started'}
            className={cx('input')}
            onKeyDown={handleKeyDown}
            type="text"
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
          />
        </div>
      </div>

      <div className={cx('section')}>
        <button className={cx('button')} onClick={start}>
          Start
        </button>
      </div>

      {status === 'started' &&
        selected.map((word, i) => (
          <span key={i} className={cx('span')}>
            <span>
              {word.split('').map((char, index) => (
                <span key={index}>
                  <span className={getCharClass(i, index, char)} key={index}>
                    {char}
                  </span>
                </span>
              ))}
            </span>
            <span> </span>
          </span>
        ))}

      {status === 'finished' && (
        <div className={cx('section')}>
          <div className="columns">
            <div className="">
              <p className="">Words Per Minute :</p>
              <p className="">{correct}</p>
            </div>
            <div className="">
              <div className="">Accuracy :</div>
              <p className="">
                {Math.round((correct / (correct + incorrect)) * 100)} %
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
