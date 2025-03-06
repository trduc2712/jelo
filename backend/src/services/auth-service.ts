import { prisma } from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

export const updateUserRefreshToken = async (
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
