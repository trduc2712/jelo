import { User } from '../interfaces/user';
import axiosInstance from './axios';

export const getAllUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const editUser = async (userId: number, userInfo: User) => {
  const { email, ...userInfoWithoutEmail } = userInfo;
  const response = await axiosInstance.put(
    `/users/${userId}`,
    userInfoWithoutEmail
  );
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await axiosInstance.post('/users', user);
  return response.data;
};

export const deleteUserById = async (userId: number) => {
  const response = await axiosInstance.delete(`/users/${userId}`);
  return response.data;
};
