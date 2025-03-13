import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  const [title, setTitle] = useState('Title');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/auth/login') {
      setTitle('Login');
    } else {
      setTitle('Register');
    }
  }, [location.pathname]);

  return (
    <div className="font-[Arial] h-screen flex items-center justify-center bg-[#262626]">
      <div className="bg-white rounded-md !p-4 w-[400px] flex flex-col">
        <h1 className="text-2xl font-bold text-center !mb-6 text-[#bb4d00]">
          {title}
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
