import stylesOverlay from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

function ModalOverlay({ onCloseModal }) {
  return <div className={stylesOverlay.overlay} onClick={onCloseModal}></div>;
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
}