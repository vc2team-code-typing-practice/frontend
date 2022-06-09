import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { getWordList } from '../features/problemSlice';

import WordPracticePage from './WordPracticePage';

export default function PracticePage() {
  const dispatch = useDispatch();
  const { languages, types } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const getProblems = () => {
      dispatch(getWordList({ languages, types }));
    };

    isLoggedIn && getProblems();
  }, [types, languages]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <WordPracticePage />
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
