import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import { Role } from "@prisma/client";

export const createUser = async ({
  name,
  email,
  phone,
  password,
  avatarUrl = "",
  address = "",
}: {
  name: string;
  email: string;
  phone: string;
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
    },
  });

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const foundUser = await prisma.user.findFirst({ where: { email } });

  if (!foundUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return foundUser;
};

export const getUserById = async (userId: number, fullInfo?: false) => {
  const foundUser = await prisma.user.findFirst({
    where: { id: userId },
    select: fullInfo
      ? undefined
      : {
          id: true,
          email: true,
          name: true,
          role: true,
          avatarUrl: true,
          address: true,
          phone: true,
        },
  });

  if (!foundUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return foundUser;
};
