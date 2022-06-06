import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

export default function PracticePage() {
  const { languages, types } = useParams();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [paragraphs, setParagraphs] = useState();

  useEffect(() => {
    const getParagraph = async () => {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/languages/${languages}`,
        {
          params: {
            type: types,
          },
        },
      );

      setParagraphs(response.data);
    };

    getParagraph();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>hello world</h1>
          <div>
            {paragraphs?.map((list, index) => {
              return (
                <div key={index}>
                  {list[languages]?.map((val, idx) => (
                    <div style={{ whiteSpace: 'pre-wrap' }} key={idx}>
                      {val}
                      <div>-------------------------</div>
                    </div>
                  ))}
                </div>
              );
            })}
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
