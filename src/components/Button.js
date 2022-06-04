import React from 'react';

import './Button.scss';

export default function Button(props) {
  // eslint-disable-next-line react/prop-types
  const { children, onClick } = props;

  return (
    <>
      <button className="btn btn-signIn" onClick={onClick}>
        {children}
      </button>
    </>
  );
}
