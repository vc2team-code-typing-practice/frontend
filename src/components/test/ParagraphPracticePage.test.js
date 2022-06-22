import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import ParagraphPracticePage from '../../pages/ParagraphPracticePage';
import { renderTest } from '../../utils/renderTest';

test('긴 글 연습 페이지 렌더링', () => {
  renderTest(
    <BrowserRouter>
      <ParagraphPracticePage />
    </BrowserRouter>,
  );
});
