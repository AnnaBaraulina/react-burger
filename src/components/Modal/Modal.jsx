import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import stylesModal from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, onCloseModal, route }) {
  const navigate = useNavigate();

  function handleEscClose(e) {
    if (e.key === "Escape") {
      onCloseModal(e);
    }
  }

  function handleClose(evt) {
    if (route) {
      return navigate(-1);
    } else {
      onCloseModal(evt);
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <>
      <div
        className={stylesModal.container}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={stylesModal.button}
          onClick={(evt) => handleClose(evt)}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
      <ModalOverlay onCloseModal={(evt) => handleClose(evt)} />
    </>,

    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func,
};

export default Modal;
