import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { axiosGetRequest } from '../api';
import { getProblemsList } from '../features/problemsSlice';

import WordPracticePage from './WordPracticePage';

export default function PracticePage() {
  const dispatch = useDispatch();
  const { languages, types } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const getProblems = async () => {
      const response = await axiosGetRequest(
        process.env.REACT_APP_SERVER_URL + `/languages/${languages}`,
        { params: { type: types } },
      );

      dispatch(getProblemsList(response.data));
    };

    isLoggedIn && getProblems();
  }, [types, isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <WordPracticePage type={types} languages={languages} />
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
