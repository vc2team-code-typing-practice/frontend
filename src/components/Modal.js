import React from 'react';

import { useNavigate } from 'react-router-dom';

import './Modal.scss';

export default function Modal({ message, onCloseModal, redirectLink }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onCloseModal(false);

    if (redirectLink) {
      navigate(redirectLink);
    }
  };

  return (
    <div className="modal__background" onClick={handleClick}>
      <div className="modal__box" onClick={(event) => event.stopPropagation()}>
        <button className="modal__closeModalBtn" onClick={handleClick}>
          X
        </button>
        <div className="modal__content">{message}</div>
      </div>
    </div>
  );
}
