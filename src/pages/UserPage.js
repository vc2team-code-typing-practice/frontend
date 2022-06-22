import React, { useEffect, useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import { AiFillSound } from 'react-icons/ai';
import {
  FaRegHandPointRight,
  FaUserAlt,
  FaCaretRight,
  FaMedal,
  FaEye,
} from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { IoSettings } from 'react-icons/io5';
import { RiCodeBoxFill } from 'react-icons/ri';
import { TiArrowBack } from 'react-icons/ti';
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
  const isGuestUser = useSelector((state) => state.user.isGuestUser);
  const isColorWeaknessUser = useSelector(
    (state) => state.user.isColorWeaknessUser,
  );

  const [selectedLanguageSetting, setSelectedLanguageSetting] = useState(null);
  const [soundEffectsSetting, setSoundEffectsSetting] = useState(null);
  const [numberProblemsSetting, setNumberProblemsSetting] = useState(null);
  const [colorWeaknessSetting, setColorWeaknessSetting] = useState(null);

  useEffect(() => {
    document.title = 'My Page | Code Typing Practice';

    setSoundEffectsSetting(soundEffects);
    setSelectedLanguageSetting(selectedLanguage);
    setNumberProblemsSetting(numberProblems);
    setColorWeaknessSetting(isColorWeaknessUser);
  }, [soundEffects, selectedLanguage, numberProblems, isColorWeaknessUser]);

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

  const handleColorWeaknessRadioButtonClick = (e) => {
    setColorWeaknessSetting(e.target.value === 'true');
  };

  const handleSettingSaveButtonClick = async () => {
    dispatch(
      changeSetting({
        id,
        selectedLanguageSetting,
        soundEffectsSetting,
        numberProblemsSetting,
        colorWeaknessSetting,
      }),
    );
  };

  return (
    <div>
      {isLoggedIn && !isGuestUser ? (
        <div className={cx('userpage')}>
          <div className={cx('userpage__title')}>
            <span className={cx('userpage__title__logo')}>
              <FaUserAlt />
            </span>
            <span
              className={cx('userpage__title__user')}
              data-testid="username"
            >
              {name}
            </span>
            <span className={cx('userpage__title__content')}> 님의 정보</span>
          </div>
          {/* 유저 점수 정보 칸 */}
          <ul className={cx('userpage__data')}>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}> 총 점수 :</span>
              <span className={cx('userpage__data__content')}>
                {' '}
                {hiscore} 점
              </span>
            </li>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}>
                {selectedLanguageSetting} 평균 타수 :
              </span>
              <span className={cx('userpage__data__content')}>
                {' '}
                {Math.floor(
                  history.reduce((accumulator, current, index, array) => {
                    if (index === array.length - 1) {
                      return (accumulator + current.typingSpeed) / array.length;
                    }
                    return accumulator + current.typingSpeed;
                  }, 0),
                )}
                타
              </span>
            </li>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}>
                {selectedLanguageSetting} 평균 정확도 :
              </span>
              <span className={cx('userpage__data__content')}>
                {' '}
                {Math.floor(
                  history.reduce((accumulator, current, index, array) => {
                    if (index === array.length - 1) {
                      return (accumulator + current.accuracy) / array.length;
                    }
                    return accumulator + current.accuracy;
                  }, 0),
                )}
                %
              </span>
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
                <span> 효과음 출력</span>
              </div>
              <label htmlFor="soundOn-radio">
                <input
                  id="soundOn-radio"
                  type="radio"
                  name="soundEffects"
                  value="true"
                  onChange={handleSoundRadioButtonClick}
                  checked={soundEffectsSetting === true}
                />{' '}
                ON
              </label>
              <label>
                <input
                  type="radio"
                  name="soundEffects"
                  value="false"
                  onChange={handleSoundRadioButtonClick}
                  checked={soundEffectsSetting === false}
                />{' '}
                OFF
              </label>
            </li>
            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <RiCodeBoxFill />
                </span>
                <span> 언어 설정</span>
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
                  value="Python"
                  onChange={handleLanguageRadioButtonClick}
                  checked={selectedLanguageSetting === 'Python'}
                />{' '}
                Python
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
            </li>

            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <HiDocumentText />
                </span>
                <span> 문제 개수 설정</span>
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

            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <FaEye />
                </span>
                <span> 색약 모드 설정</span>
              </div>
              <label>
                <input
                  type="radio"
                  name="colorWeakness"
                  value="true"
                  onChange={handleColorWeaknessRadioButtonClick}
                  checked={colorWeaknessSetting === true}
                />{' '}
                켜기
              </label>
              <label>
                <input
                  type="radio"
                  name="colorWeakness"
                  value="false"
                  onChange={handleColorWeaknessRadioButtonClick}
                  checked={colorWeaknessSetting === false}
                />{' '}
                끄기
              </label>
            </li>

            <li className={cx('userpage__setting__item')}>
              <button onClick={handleSettingSaveButtonClick}>
                <div className={cx('save_btn')}>설정 저장하기</div>
              </button>
            </li>
          </ul>

          <div data-testid="record">
            <div className={cx('userpage__title')}>
              <span className={cx('userpage__title__logo')}>
                <FaMedal />
              </span>
              <span>기록</span>
            </div>

            <div className={cx('history')}>
              {history
                ?.slice()
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map((data, index) => {
                  let className;
                  {
                    className =
                      typeToKoreanName[data.type] === '짧은 글'
                        ? 'sentence'
                        : 'paragraph';
                  }

                  return (
                    <div key={index} className={cx('history__content')}>
                      <span className={cx('history__content', `${className}`)}>
                        {typeToKoreanName[data.type]}
                      </span>
                      <span className={cx('history__data')}>
                        {data.time?.replace('T', ' ')} <FaRegHandPointRight />
                      </span>
                      <span className={cx('history__data')}>
                        <span className={cx('history__data__title')}>
                          타속 : {data.typingSpeed}
                        </span>
                      </span>
                      <span className={cx('history__data')}>
                        <span className={cx('history__data__title')}>
                          정확도 : {data.accuracy}%
                        </span>
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={cx('move_back')}>
            <Link to="/">
              <TiArrowBack />
              뒤로가기
            </Link>
          </div>
        </div>
      ) : (
        <div className={cx('message')}>
          <p>로그인 해야 합니다</p>
          <Link to="/">뒤로가기</Link>
        </div>
      )}
    </div>
  );
}
