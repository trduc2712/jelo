import React from 'react';
import { ConfigProvider } from 'antd';
import { AuthProvider, ModalProvider, NotificationProvider } from '../contexts';

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
      }}>
      <AuthProvider>
        <ModalProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </ModalProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default Provider;
