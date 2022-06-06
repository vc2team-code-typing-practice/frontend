import React from 'react';

import './Modal.scss';

// eslint-disable-next-line react/prop-types
export default function Modal({ message, onCloseModal }) {
  return (
    <div className="modal__background" onClick={() => onCloseModal(false)}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__closeModalBtn"
          onClick={() => onCloseModal(false)}
        >
          X
        </button>
        <p className="modal__content">{message}</p>
      </div>
    </div>
  );
}
