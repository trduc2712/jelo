import React, { createContext } from "react";
import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";

interface NotificationContextType {
  notificationApi: NotificationInstance;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={{ notificationApi }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
