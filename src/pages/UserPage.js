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
            <span className={cx('userpage__title__content')}> ?????? ??????</span>
          </div>
          {/* ?????? ?????? ?????? ??? */}
          <ul className={cx('userpage__data')}>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}> ??? ?????? :</span>
              <span className={cx('userpage__data__content')}>
                {' '}
                {hiscore} ???
              </span>
            </li>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}>
                {selectedLanguageSetting} ?????? ?????? :
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
                ???
              </span>
            </li>
            <li className={cx('userpage__data__item')}>
              <span className={cx('userpage__data__logo')}>
                <FaCaretRight />
              </span>
              <span className={cx('userpage__data__title')}>
                {selectedLanguageSetting} ?????? ????????? :
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
          {/* ?????? ?????? ??? */}
          <div className={cx('userpage__title')}>
            <span className={cx('userpage__title__logo')}>
              <IoSettings />
            </span>
            <span>????????????</span>
          </div>

          <ul className={cx('userpage__setting')}>
            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <AiFillSound />
                </span>
                <span> ????????? ??????</span>
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
                <span> ?????? ??????</span>
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
                <span> ?????? ?????? ??????</span>
              </div>
              <label>
                <input
                  type="radio"
                  name="numberProblems"
                  value="10"
                  onChange={handleProblemsRadioButtonClick}
                  checked={numberProblemsSetting === 10}
                />{' '}
                10???
              </label>
              <label>
                <input
                  type="radio"
                  name="numberProblems"
                  value="20"
                  onChange={handleProblemsRadioButtonClick}
                  checked={numberProblemsSetting === 20}
                />{' '}
                20???
              </label>
              <label>
                <input
                  type="radio"
                  name="numberProblems"
                  value="40"
                  onChange={handleProblemsRadioButtonClick}
                  checked={numberProblemsSetting === 40}
                />{' '}
                40???
              </label>
            </li>

            <li className={cx('userpage__setting__item')}>
              <div className={cx('userpage__setting__title')}>
                <span className={cx('userpage__setting__logo')}>
                  <FaEye />
                </span>
                <span> ?????? ?????? ??????</span>
              </div>
              <label>
                <input
                  type="radio"
                  name="colorWeakness"
                  value="true"
                  onChange={handleColorWeaknessRadioButtonClick}
                  checked={colorWeaknessSetting === true}
                />{' '}
                ??????
              </label>
              <label>
                <input
                  type="radio"
                  name="colorWeakness"
                  value="false"
                  onChange={handleColorWeaknessRadioButtonClick}
                  checked={colorWeaknessSetting === false}
                />{' '}
                ??????
              </label>
            </li>

            <li className={cx('userpage__setting__item')}>
              <button onClick={handleSettingSaveButtonClick}>
                <div className={cx('save_btn')}>?????? ????????????</div>
              </button>
            </li>
          </ul>

          <div data-testid="record">
            <div className={cx('userpage__title')}>
              <span className={cx('userpage__title__logo')}>
                <FaMedal />
              </span>
              <span>??????</span>
            </div>

            <div className={cx('history')}>
              {history
                ?.slice()
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map((data, index) => {
                  let className;
                  {
                    className =
                      typeToKoreanName[data.type] === '?????? ???'
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
                          ?????? : {data.typingSpeed}
                        </span>
                      </span>
                      <span className={cx('history__data')}>
                        <span className={cx('history__data__title')}>
                          ????????? : {data.accuracy}%
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
              ????????????
            </Link>
          </div>
        </div>
      ) : (
        <div className={cx('message')}>
          <p>????????? ?????? ?????????</p>
          <Link to="/">????????????</Link>
        </div>
      )}
    </div>
  );
}
