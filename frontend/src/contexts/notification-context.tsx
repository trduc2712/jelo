import React, { createContext } from "react";
import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";

interface NotificationContextType {
  api: NotificationInstance;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={{ api }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
