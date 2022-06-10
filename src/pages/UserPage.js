import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { changeSetting, loadUserRecord } from '../features/userSlice';

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

  const [userRecord, setUserRecord] = useState([]);
  const [selectedLanguageSetting, setSelectedLanguageSetting] = useState('C');
  const [soundEffectsSetting, setSoundEffectsSetting] = useState(true);
  const [numberProblemsSetting, setNumberProblemsSetting] = useState(10);

  useEffect(() => {
    selectedLanguage && dispatch(loadUserRecord({ id, selectedLanguage }));
    setSoundEffectsSetting(soundEffects);
    setSelectedLanguageSetting(selectedLanguage);
    setNumberProblemsSetting(numberProblems);
  }, [soundEffects, selectedLanguage, numberProblems]);

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
        <div>
          <div>
            <h3>{name} 님의 정보</h3>
            <hr />
            <p>최고 점수 : {hiscore}</p>
            <p>평균 타수 : </p>
            <p>평균 정확도 : </p>
          </div>

          <div>
            <h3>환경 설정</h3>
            <hr />

            <div>
              <p>효과음 출력</p>
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
            </div>

            <div>
              <p>언어 설정</p>
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
            </div>

            <div>
              <p>문제 개수 설정</p>
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
            </div>

            <button onClick={handleSettingSaveButtonClick}>
              설정 저장하기
            </button>
          </div>

          <div>
            <h3>기록</h3>
            <hr />
            {history &&
              history.map((data, index) => (
                <div key={index}>
                  {' '}
                  {data.time.replace('T', ' ')}: 타속: {data.typingSpeed}{' '}
                  정확도: {data.accuracy}%
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
