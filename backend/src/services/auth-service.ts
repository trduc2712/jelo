import { prisma } from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import { Role, UserStatus } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { userServices } from './user-service.js';
import { generateAuthToken } from '../utils/token-util.js';

const register = async ({
  name,
  email,
  phone = '',
  password,
  avatarUrl = '',
  address = '',
}: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  avatarUrl?: string;
  address?: string;
}) => {
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
      avatarUrl,
      address,
      phone,
      status: UserStatus.ACTIVE,
    },
  });

  return newUser;
};

const login = async (email: string, password: string) => {
  const user = await userServices.getUserByEmail(email);

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const { accessToken, refreshToken, refreshTokenExpiresAt } =
    generateAuthToken(user.id);
  await updateUserRefreshToken(user.id, refreshToken, refreshTokenExpiresAt);

  return accessToken;
};

const updateUserRefreshToken = async (
  userId: number,
  refreshToken: string,
  refreshTokenExpiresAt: Date
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken,
      refreshTokenExpiresAt: refreshTokenExpiresAt,
    },
  });
};

export const authServices = { register, login, updateUserRefreshToken };
