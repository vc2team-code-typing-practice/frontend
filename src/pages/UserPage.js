import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { setAxios, getAxios, patchAxios } from '../api';
import { authService } from '../auth';
import { loginSuccess, changeSetting } from '../features/userSlice';

export default function UserPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { name, hiscore, soundEffects, selectedLanguage } = useSelector(
    (state) => state.user,
  );

  const [userData, setUserData] = useState('');

  const [selectedLanguageSetting, setSelectedLanguageSetting] = useState('C');
  const [soundEffectsSetting, setSoundEffectsSetting] = useState(true);

  useEffect(() => {
    setSoundEffectsSetting(soundEffects);
    setSelectedLanguageSetting(selectedLanguage);
  }, [soundEffects, selectedLanguage]);

  const handleLanguageRadioButtonClick = (e) => {
    setSelectedLanguageSetting(e.target.value);
  };

  const handleSoundRadioButtonClick = (e) => {
    setSoundEffectsSetting(e.target.value === 'true');
  };

  const hancleSettingSaveButtonClick = async () => {
    dispatch(
      changeSetting({ id, selectedLanguageSetting, soundEffectsSetting }),
    );
  };

  return (
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
        <button onClick={hancleSettingSaveButtonClick}>설정 저장하기</button>
      </div>

      <div>
        <h3>기록</h3>
        <hr />
        {userData &&
          userData.languageRecord?.map((list) =>
            list.language === selectedLanguage ? (
              <>
                <div>{list.language.updatedAt}</div>
                <div>{list.language.maxTypingSpeed}</div>
                <div>{list.language.accuracy}</div>
              </>
            ) : null,
          )}
      </div>

      <div>
        <Link to="/">뒤로가기</Link>
      </div>
    </div>
  );
}
