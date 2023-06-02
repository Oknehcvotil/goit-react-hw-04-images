import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalCont } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ data, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleOnClose);

    return () => window.removeEventListener('keydown', handleOnClose);
  });

  const handleOnClose = e => {
    console.log(e.code);
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onClose();
    }
  };

  const { largeImg, alt } = data;

  return createPortal(
    <Overlay onClick={handleOnClose}>
      <ModalCont>
        <img src={largeImg} alt={alt} />
      </ModalCont>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  data: PropTypes.shape({
    largeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Modal;
