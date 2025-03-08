import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { Role, UserStatus } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";

const register = async ({
  name,
  email,
  phone = "",
  password,
  avatarUrl = "",
  address = "",
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
      "Email has already been registered"
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

const updateUserRefreshToken = async (
  userId: number,
  refreshToken: string,
  expiresAt: Date
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken,
      refreshTokenExpiresAt: expiresAt,
    },
  });
};

export const authServices = { register, updateUserRefreshToken };
