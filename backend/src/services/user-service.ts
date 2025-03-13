import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import { Role, UserStatus, User, Gender, Prisma } from '@prisma/client';

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
          createdAt: true,
          dateOfBirth: true,
          lastActiveAt: true,
          lastLoginAt: true,
          gender: true,
          updatedAt: true,
        },
  });

  if (!foundUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return foundUser;
};

const countAllUsers = async (): Promise<number> => {
  const totalUsers = await prisma.user.count();
  return totalUsers;
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
          createdAt: true,
          dateOfBirth: true,
          lastActiveAt: true,
          lastLoginAt: true,
          gender: true,
          updatedAt: true,
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
  password,
  role,
  avatarUrl,
  address,
  phone,
  status,
  dateOfBirth,
  gender,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  avatarUrl: string;
  address: string;
  status: UserStatus;
  dateOfBirth: Date;
  gender: Gender;
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
  const isValidDate = (date: any) => date && !isNaN(Date.parse(date));
  const newUser: User = await prisma.user.create({
    data: {
      email,
      name,
      role,
      password: encryptedPassword,
      avatarUrl,
      address,
      phone,
      status,
      dateOfBirth: isValidDate(dateOfBirth) ? new Date(dateOfBirth) : null,
      gender,
    },
  });

  return newUser;
};

const deleteUserById = async (
  currentUserId: number,
  targetUserId: number
): Promise<Prisma.BatchPayload> => {
  const existingUser: User | null = await getUserById(targetUserId);
  await checkDeletePermission(currentUserId, targetUserId);
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

const checkDeletePermission = async (
  currentUserId: number,
  targetUserId: number
): Promise<void> => {
  if (currentUserId === targetUserId) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You cannot delete yourself');
  }

  const targetUser: User = await getUserById(targetUserId);
  const currentUser: User = await getUserById(currentUserId);
  if (targetUser.role === 'ADMIN' && currentUser.role !== 'SUPER_ADMIN') {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'You cannot delete another administrator'
    );
  }
};

const updateInactiveUsers = async (): Promise<Prisma.BatchPayload> => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  await prisma.user.updateMany({
    where: {
      status: 'ACTIVE',
      lastActiveAt: { lt: sevenDaysAgo },
    },
    data: {
      status: 'INACTIVE',
    },
  });
};

const updateUserLastActive = async (userId: number): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      lastActiveAt: new Date(),
    },
  });
};

export const userServices = {
  getUserByEmail,
  getUserById,
  getAllUsers,
  createUser,
  deleteUserById,
  editUser,
  checkDeletePermission,
  countAllUsers,
  updateInactiveUsers,
  updateUserLastActive,
};
