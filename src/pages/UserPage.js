import React, { useEffect, useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import { AiFillSound } from 'react-icons/ai';
import { FaUserAlt, FaCaretRight } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { HiDocumentText } from 'react-icons/hi';
import { IoSettings } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { changeSetting, loadUserRecord } from '../features/userSlice';
import { typeToKoreanName } from '../utils/constants';

import styles from './UserPage.module.scss';

const cx = classNames.bind(styles);

export default function UserPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const name = useSelector((state) => state.user.name);
  const hiscore = useSelector((state) => state.user.hiscore);
  const soundEffects = useSelector((state) => state.user.soundEffects);
  const selectedLanguage = useSelector((state) => state.user.selectedLanguage);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const numberProblems = useSelector((state) => state.user.numberProblems);
  const history = useSelector((state) => state.user.history);

  const [selectedLanguageSetting, setSelectedLanguageSetting] = useState(null);
  const [soundEffectsSetting, setSoundEffectsSetting] = useState(null);
  const [numberProblemsSetting, setNumberProblemsSetting] = useState(null);

  useEffect(() => {
    setSoundEffectsSetting(soundEffects);
    setSelectedLanguageSetting(selectedLanguage);
    setNumberProblemsSetting(numberProblems);
  }, [soundEffects, selectedLanguage, numberProblems]);

  useMemo(() => {
    selectedLanguageSetting &&
      dispatch(loadUserRecord({ id, selectedLanguageSetting }));
  }, [selectedLanguageSetting]);

  const handleLanguageRadioButtonClick = (e) => {
    setSelectedLanguageSetting(e.target.value);
  };

  const handleSoundRadioButtonClick = (e) => {
    setSoundEffectsSetting(e.target.value === 'true');
  };

  const handleProblemsRadioButtonClick = (e) => {
    setNumberProblemsSetting(Number(e.target.value));
  };

  const handleSettingSaveButtonClick = async () => {
    dispatch(
      changeSetting({
        id,
        selectedLanguageSetting,
        soundEffectsSetting,
        numberProblemsSetting,
      }),
    );
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className={cx('userpage')}>
          <div className={cx('userpage__title')}>
            <span className={cx('userpage__title__logo')}>
              <FaUserAlt />
            </span>
            <span className={cx('userpage__title__user')}>{name}</span>
            <span className={cx('userpage__title__content')}> 님의 정보</span>
          </div>
          {/* 유저 점수 정보 칸 */}
          <ul className={cx('userpage__data')}>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}>
                {selectedLanguageSetting} 점수 :
              </span>
              <span className={cx('userpage__data__content')}> {hiscore}</span>
            </li>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}>
                {selectedLanguageSetting} 평균 타수 :
              </span>
              <span className={cx('userpage__data__content')}> 타</span>
            </li>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}>
                {selectedLanguageSetting} 평균 정확도 :
              </span>
              <span className={cx('userpage__data__content')}> %</span>
            </li>
          </ul>
          {/* 환경 설정 칸 */}
          <div className={cx('userpage__title')}>
            <span className={cx('userpage__title__logo')}>
              <IoSettings />
            </span>
            <span>환경설정</span>
          </div>

          <ul className={cx('userpage__setting')}>
            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <AiFillSound />
                </span>
                <span>효과음 출력</span>
              </div>
              <label>
                <input
                  type="radio"
                  name="soundEffects"
                  value="true"
                  onChange={handleSoundRadioButtonClick}
                  checked={soundEffectsSetting === true}
                />
                ON
              </label>
              <label>
                <input
                  type="radio"
                  name="soundEffects"
                  value="false"
                  onChange={handleSoundRadioButtonClick}
                  checked={soundEffectsSetting === false}
                />
                OFF
              </label>
            </li>
            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <GrLanguage />
                </span>
                <span>언어 설정</span>
              </div>
              <label>
                <input
                  type="radio"
                  name="selectedLanguage"
                  value="C"
                  onChange={handleLanguageRadioButtonClick}
                  checked={selectedLanguageSetting === 'C'}
                />{' '}
                C
              </label>
              <label>
                <input
                  type="radio"
                  name="selectedLanguage"
                  value="JavaScript"
                  onChange={handleLanguageRadioButtonClick}
                  checked={selectedLanguageSetting === 'JavaScript'}
                />{' '}
                JavaScript
              </label>
              <label>
                <input
                  type="radio"
                  name="selectedLanguage"
                  value="Python"
                  onChange={handleLanguageRadioButtonClick}
                  checked={selectedLanguageSetting === 'Python'}
                />{' '}
                Python
              </label>
            </li>

            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <HiDocumentText />
                </span>
                <span>문제 개수 설정</span>
              </div>

              <label>
                <input
                  type="radio"
                  name="numberProblems"
                  value="10"
                  onChange={handleProblemsRadioButtonClick}
                  checked={numberProblemsSetting === 10}
                />{' '}
                10개
              </label>
              <label>
                <input
                  type="radio"
                  name="numberProblems"
                  value="20"
                  onChange={handleProblemsRadioButtonClick}
                  checked={numberProblemsSetting === 20}
                />{' '}
                20개
              </label>
              <label>
                <input
                  type="radio"
                  name="numberProblems"
                  value="40"
                  onChange={handleProblemsRadioButtonClick}
                  checked={numberProblemsSetting === 40}
                />{' '}
                40개
              </label>
            </li>
            <li>
              <button onClick={handleSettingSaveButtonClick}>
                설정 저장하기
              </button>
            </li>
          </ul>
          <div>
            <h3>기록</h3>
            <hr />
            {history.map((data, index) => (
              <div key={index}>
                {typeToKoreanName[data.type]} {data.time?.replace('T', ' ')}{' '}
                타속: {data.typingSpeed} 정확도: {data.accuracy}%
              </div>
            ))}
          </div>

          <div>
            <Link to="/">뒤로가기</Link>
          </div>
        </div>
      ) : (
        <div>
          <p>로그인 해야 합니다</p>
          <Link to="/">뒤로가기</Link>
        </div>
      )}
    </div>
  );
}
