import { useContext } from "react";
import { ModalContext } from "../contexts";
import { Modal } from "antd";

type ModalContextType = ReturnType<typeof Modal.useModal>;
type ModalApi = ModalContextType[0];

const useModal = (): ModalApi => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const [modalApi] = context;
  return modalApi;
};

export default useModal;
