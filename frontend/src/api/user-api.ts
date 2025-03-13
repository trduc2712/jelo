import { User } from '../interfaces/user';
import axiosClient from './axios-client';

export const getAllUsers = async () => {
  const res = await axiosClient.get('/users');
  return res.data;
};

export const editUser = async (userId: number, userInfo: User) => {
  const { email, ...userInfoWithoutEmail } = userInfo;
  const res = await axiosClient.put(`/users/${userId}`, userInfoWithoutEmail);
  return res.data;
};

export const createUser = async (user: User) => {
  const res = await axiosClient.post('/users', user);
  return res.data;
};

export const deleteUserById = async (userId: number) => {
  const res = await axiosClient.delete(`/users/${userId}`);
  return res.data;
};
