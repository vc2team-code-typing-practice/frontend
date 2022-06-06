import React from 'react';

import './Button.scss';

// eslint-disable-next-line react/prop-types
export default function Button({ children, onClick }) {
  return (
    <div>
      <button className="btn btn__content" onClick={onClick}>
        <h3>{children}</h3>
      </button>
    </div>
  );
}
