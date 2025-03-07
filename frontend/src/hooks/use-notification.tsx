import { useContext } from "react";
import { NotificationContext } from "../contexts/notification-context";

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }

  return context.api;
};

export default useNotification;
