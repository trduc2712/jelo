import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { Role, UserStatus } from "@prisma/client";

const getUserByEmail = async (email: string) => {
  const foundUser = await prisma.user.findFirst({ where: { email } });

  if (!foundUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return foundUser;
};

const getUserById = async (userId: number, fullInfo?: false) => {
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
          status: true,
        },
  });

  if (!foundUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return foundUser;
};

const getAllUsers = async (fullInfo?: false) => {
  const users = await prisma.user.findMany({
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
          status: true,
        },
  });

  if (users.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No users found");
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
      role,
      avatarUrl,
      address,
      phone,
      status: UserStatus.ACTIVE,
    },
  });

  return newUser;
};

const deleteUserById = async (userId: number) => {
  const existingUser = await prisma.user.findFirst({ where: { id: userId } });

  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  await prisma.user.delete({ where: { id: userId } });
};

const editUser = async ({
  userId,
  name,
  password,
  role,
  avatarUrl,
  address,
  phone,
  status,
}: {
  userId: number;
  name: string;
  phone: string;
  password: string;
  role: Role;
  avatarUrl: string;
  address: string;
  status: UserStatus;
}) => {
  const existingUser = await prisma.user.findFirst({ where: { id: userId } });
  const encryptedPassword = await bcrypt.hash(password, 12);
  const newUserData = {
    name,
    phone,
    password: encryptedPassword,
    role,
    avatarUrl,
    address,
    status,
  };

  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: newUserData,
  });

  return updatedUser;
};

export const userServices = {
  getUserByEmail,
  getUserById,
  getAllUsers,
  createUser,
  deleteUserById,
  editUser,
};
