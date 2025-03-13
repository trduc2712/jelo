import React from 'react';
import { ConfigProvider } from 'antd';
import {
  AuthProvider,
  ModalProvider,
  NotificationProvider,
  LoadingProvider,
} from '../contexts';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#bb4d00',
          borderRadius: 6,
          fontFamily: 'Arial',
        },
        components: {
          Card: {
            colorBorder: 'black',
          },
        },
      }}
    >
      <NotificationProvider>
        <ModalProvider>
          <AuthProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </AuthProvider>
        </ModalProvider>
      </NotificationProvider>
    </ConfigProvider>
  );
};

export default Provider;
