import React from 'react';

import { useParams } from 'react-router-dom';

export default function PracticePage() {
  const { languages, types } = useParams();

  return <h1>hello world</h1>;
}
