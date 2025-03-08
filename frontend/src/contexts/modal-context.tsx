import React, { createContext } from "react";
import { Modal } from "antd";

type ModalContextType = ReturnType<typeof Modal.useModal>;

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const modalApi = Modal.useModal();

  return (
    <ModalContext.Provider value={modalApi}>
      {modalApi[1]}
      {children}
    </ModalContext.Provider>
  );
};
