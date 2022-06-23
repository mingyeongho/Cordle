import { createPortal } from "react-dom";
import styles from "../../styles/reusable/_modal.module.scss";
import { ModalProps } from "../files/interface";

const Modal = ({ children }: ModalProps) => {
  const portal = document.getElementById("portal");
  return (
    portal &&
    createPortal(
      <div className={`modal ${styles.modal_container}`}>{children}</div>,
      portal
    )
  );
};

export default Modal;
