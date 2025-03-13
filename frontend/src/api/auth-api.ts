import axiosClient from './axios-client';

const register = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const res = await axiosClient.post('/auth/register', {
    email,
    name,
    password,
  });

  return res.data;
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axiosClient.post('/auth/login', {
    email,
    password,
  });
  if (res.data.accessToken) {
    localStorage.setItem('accessToken', res.data.accessToken);
  }

  return res.data;
};

const getCurrentUser = async () => {
  const res = await axiosClient.get('/auth/me');
  return res.data;
};

const logout = async () => {
  const res = await axiosClient.post('/auth/logout');
  localStorage.removeItem('accessToken');
  return res.data;
};

export const authApi = { register, login, getCurrentUser, logout };
