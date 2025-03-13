import { prisma } from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import { Role, UserStatus, User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { userServices } from './user-service.js';
import { generateAuthToken } from '../utils/token-util.js';
import { logout } from '../controllers/auth-controller.js';

const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const encryptedPassword = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Email has already been registered'
    );
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: encryptedPassword,
      role: Role.CUSTOMER,
      status: UserStatus.ACTIVE,
    },
  });

  return newUser;
};

const login = async (
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user: User = await userServices.getUserByEmail(email);
  const userId: number = user.id;
  await userServices.updateUserLastActive(userId);

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const { accessToken, refreshToken, refreshTokenExpiresAt } =
    generateAuthToken(user.id);
  await updateRefreshToken(user.id, refreshToken, refreshTokenExpiresAt);

  return { accessToken, refreshToken };
};

const updateRefreshToken = async (
  userId: number,
  refreshToken: string,
  refreshTokenExpiresAt: Date
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken,
      refreshTokenExpiresAt,
    },
  });
};

const isRefreshTokenExpired = async (userId: number): Promise<boolean> => {
  const { refreshToken, refreshTokenExpiresAt } = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      refreshToken: true,
      refreshTokenExpiresAt: true,
    },
  });

  if (new Date() > refreshTokenExpiresAt) {
    return true;
  } else {
    return false;
  }
};

const refreshToken = async (
  userId: number
): Promise<{ newAccessToken: string; newRefreshToken: string }> => {
  const {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    refreshTokenExpiresAt,
  } = generateAuthToken(userId);
  await authServices.updateRefreshToken(
    userId,
    newRefreshToken,
    refreshTokenExpiresAt
  );

  return { newAccessToken, newRefreshToken };
};

export const clearRefreshToken = async (userId: number): Promise<User> => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null, refreshTokenExpiresAt: null },
  });
};

export const authServices = {
  register,
  login,
  updateRefreshToken,
  isRefreshTokenExpired,
  refreshToken,
  clearRefreshToken,
};
