import { useContext } from "react";
import { ModalContext } from "../contexts";
import { Modal } from "antd";

type ModalContextType = ReturnType<typeof Modal.useModal>;

const useModal = (): ModalContextType[0] => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context[0];
};

export default useModal;
