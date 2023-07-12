import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import stylesModal from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
  onCloseModal?: () => void;
  children: ReactNode;
  route?: boolean;
}

const Modal: FC<IModal> = ({ children, onCloseModal, route }) => {
  const navigate = useNavigate();

  function handleClose() {
    if (route) {
      return navigate(-1);
    } else {
      onCloseModal && onCloseModal();
    }
  }

  function handleEscClose(evt: { key: string }) {
    if (evt.key === "Escape") {
      handleClose();
    }
  }

   useEffect(() => {
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
          onClick={() => handleClose()}
        >
          <CloseIcon type='primary'/>
        </button>
        {children}
      </div>
      <ModalOverlay onCloseModal={() => handleClose()} />
    </>,

    modalRoot
  );
}



export default Modal;
