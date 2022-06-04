import React from 'react';

import './Button.scss';

function Button(props) {
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

export default Button;
