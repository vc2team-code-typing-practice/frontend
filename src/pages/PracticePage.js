import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { axiosGetRequest } from '../api';

import WordPracticePage from './WordPracticePage';

export default function PracticePage() {
  const { languages, types } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [problems, setProblems] = useState();

  useEffect(() => {
    const getProblems = async () => {
      const response = await axiosGetRequest(
        process.env.REACT_APP_SERVER_URL + `/languages/${languages}`,
        { params: { type: types } },
      );

      setProblems(response.data);
    };

    isLoggedIn && getProblems();
  }, [types]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <WordPracticePage
            words={problems}
            type={types}
            languages={languages}
          />
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
