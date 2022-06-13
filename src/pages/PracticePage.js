import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import {
  getParagraphList,
  getSentenceList,
  getWordList,
} from '../features/problemSlice';

import ParagraphPracticePage from './ParagraphPracticePage';
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
    isLoggedIn &&
      types === 'paragraph' &&
      dispatch(getParagraphList({ languages, types }));
  }, [types, languages, isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {(types === 'word' && <WordPracticePage />) ||
            (types === 'sentence' && (
              <SentencePracticePage selectedLanguage={languages} type={types} />
            )) ||
            (types === 'paragraph' && (
              <ParagraphPracticePage
                selectedLanguage={languages}
                type={types}
              />
            ))}
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
