import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import { Role, UserStatus, User } from '@prisma/client';

const getUserByEmail = async (email: string): Promise<User> => {
  const foundUser: User | null = await prisma.user.findFirst({
    where: { email },
  });

  if (!foundUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return foundUser;
};

const getUserById = async (
  userId: number,
  isFullInfo: boolean = false
): Promise<User> => {
  const foundUser: User | null = await prisma.user.findFirst({
    where: { id: userId },
    select: isFullInfo
      ? undefined
      : {
          id: true,
          email: true,
          name: true,
          role: true,
          avatarUrl: true,
          address: true,
          phone: true,
          status: true,
        },
  });

  if (!foundUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return foundUser;
};

const getAllUsers = async (isFullInfo: boolean = false): Promise<User[]> => {
  const users: User[] = await prisma.user.findMany({
    select: isFullInfo
      ? undefined
      : {
          id: true,
          email: true,
          name: true,
          role: true,
          avatarUrl: true,
          address: true,
          phone: true,
          status: true,
        },
  });

  if (users.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No users found');
  }

  return users;
};

const createUser = async ({
  name,
  email,
  phone,
  password,
  role,
  avatarUrl,
  address,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  avatarUrl: string;
  address: string;
}): Promise<User> => {
  const existingUser: User | null = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Email has already been registered'
    );
  }

  const encryptedPassword: string = await bcrypt.hash(password, 12);
  const newUser: User = await prisma.user.create({
    data: {
      email,
      name,
      password: encryptedPassword,
      role,
      avatarUrl,
      address,
      phone,
      status: UserStatus.ACTIVE,
    },
  });

  return newUser;
};

const deleteUserById = async (
  currentUserId: number,
  targetUserId: number
): Promise<User> => {
  const existingUser: User | null = await prisma.user.findFirst({
    where: { id: targetUserId },
  });

  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  await checkDeletingSelf(currentUserId, targetUserId);

  return prisma.user.delete({ where: { id: targetUserId } });
};

const editUser = async (userId: number, newUserData: User): Promise<User> => {
  if (newUserData.email) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Email change is not allowed');
  }

  const existingUser: User | null = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const updateData: Partial<User> = { ...newUserData };

  if (newUserData.password && newUserData.password.trim() !== '') {
    updateData.password = await bcrypt.hash(newUserData.password, 12);
  } else {
    delete updateData.password;
  }

  const updatedUser: User = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return updatedUser;
};

const checkRole = async (userId: number): Promise<Role> => {
  const user: User | null = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user.role;
};

const checkDeletingSelf = async (
  currentUserId: number,
  targetUserId: number
): Promise<void> => {
  if (currentUserId === targetUserId) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You cannot delete yourself');
  }
};

export const userServices = {
  getUserByEmail,
  getUserById,
  getAllUsers,
  createUser,
  deleteUserById,
  editUser,
  checkRole,
  checkDeletingSelf,
};
