import { prisma } from "../config/prisma.js";

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
