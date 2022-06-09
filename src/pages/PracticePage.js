import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { getSentenceList, getWordList } from '../features/problemSlice';

import SentencePracticePage from './SentencePracticePage';
import WordPracticePage from './WordPracticePage';

export default function PracticePage() {
  const dispatch = useDispatch();
  const { languages, types } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    isLoggedIn &&
      types === 'word' &&
      dispatch(getWordList({ languages, types }));
    isLoggedIn &&
      types === 'sentence' &&
      dispatch(getSentenceList({ languages, types }));
  }, [types, languages]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {types === 'word' ? <WordPracticePage /> : <SentencePracticePage />}
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
