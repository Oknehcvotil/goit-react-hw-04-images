import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalCont } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    data: PropTypes.shape({
      largeImg: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
  };

  state = {
    data: this.props.data,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnClose);
  }

  handleOnClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImg, alt } = this.state.data;

    return createPortal(
      <Overlay onClick={this.handleOnClose}>
        <ModalCont>
          <img src={largeImg} alt={alt} />
        </ModalCont>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
