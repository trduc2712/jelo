import { useContext } from 'react';
import { LoadingContext } from '../contexts';

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within an LoadingProvider');
  }

  return context;
};

export default useLoading;
