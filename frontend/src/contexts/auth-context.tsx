import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { authApi } from '../api/auth-api';
import { useNotification } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { User } from '../interfaces/user';

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  register: (data: { email: string; name: string; password: string }) => void;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const navigate = useNavigate();
  const notificationApi = useNotification();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchUserData = async () => {
      try {
        const data = await authApi.getCurrentUser();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken]);

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const register = async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    try {
      const resData = await authApi.register(data);

      if (resData && !resData.statusCode) {
        notificationApi.success({
          message: 'Success',
          description: resData.message,
        });
        navigate('/auth/login');
      } else {
        notificationApi.error({
          message: 'Error',
          description: resData.message,
        });
      }
    } catch (err) {
      console.log(err);
      notificationApi.error({
        message: 'Error',
        description: 'An unexpected error occurred during the register process',
      });
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      const resData = await authApi.login(data);

      if (resData && !resData.statusCode) {
        const dataGetCurrentUser = await authApi.getCurrentUser();
        const user = dataGetCurrentUser.user;
        setUser(user);

        if (user.status === 'BANNED') {
          return navigate('/banned');
        }

        notificationApi.success({
          message: 'Success',
          description:
            user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'
              ? 'Welcome back, administrator!'
              : resData.message,
        });
        navigate(
          user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? '/admin' : '/'
        );
      } else {
        notificationApi.error({
          message: 'Error',
          description: resData.message,
        });
      }
    } catch (err) {
      console.log(err);
      notificationApi.error({
        message: 'Error',
        description: 'An unexpected error occurred during the login process',
      });
    }
  };

  const logout = async () => {
    const resData = await authApi.logout();

    if (resData && !resData.statusCode) {
      notificationApi.success({
        message: 'Success',
        description: resData.message,
      });

      setUser(null);
      navigate('/auth/login');
    } else {
      notificationApi.error({
        message: 'Error',
        description: resData.message,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
