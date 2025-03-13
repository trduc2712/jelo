import React, { createContext, useState } from 'react';
import { Spin } from 'antd';

interface LoadingContextType {
  startLoading: () => void;
  endLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const startLoading = () => setLoading(true);

  const endLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ startLoading, endLoading }}>
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
