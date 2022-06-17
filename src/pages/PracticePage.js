import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import {
  getParagraphList,
  getSentenceList,
  getWordList,
  getWordListSuccess,
  getSentenceListSucces,
  getParagraphListSuccess,
} from '../features/problemSlice';
import loadMockData from '../utils/loadMockData';

import ParagraphPracticePage from './ParagraphPracticePage';
import SentencePracticePage from './SentencePracticePage';
import WordPracticePage from './WordPracticePage';

export default function PracticePage() {
  const dispatch = useDispatch();
  const { languages, types } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isGuestUser = useSelector((state) => state.user.isGuestUser);

  useEffect(() => {
    document.title = `${languages} ${types} practice`;

    if (isLoggedIn) {
      if (isGuestUser) {
        if (types === 'word') {
          dispatch(getWordListSuccess(loadMockData(languages, types)));
        } else if (types === 'sentence') {
          dispatch(getSentenceListSucces(loadMockData(languages, types)));
        } else if (types === 'paragraph') {
          dispatch(getParagraphListSuccess(loadMockData(languages, types)));
        }
      } else {
        if (types === 'word') {
          dispatch(getWordList({ languages, types }));
        } else if (types === 'sentence') {
          dispatch(getSentenceList({ languages, types }));
        } else if (types === 'paragraph') {
          dispatch(getParagraphList({ languages, types }));
        }
      }
    }
  }, [types, languages, isLoggedIn, isGuestUser]);

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
