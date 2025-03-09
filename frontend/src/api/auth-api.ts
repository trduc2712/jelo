import axiosInstance from './axios';

export const register = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const response = await axiosInstance.post('/auth/register', {
    email,
    name,
    password,
  });

  return response.data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });

  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  }

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/auth/me');

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  localStorage.removeItem('accessToken');

  return response.data;
};
