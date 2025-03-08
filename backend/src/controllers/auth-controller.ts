import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { userServices } from "../services/user-service.js";
import { generateToken } from "../utils/token-util.js";
import { authServices } from "../services/auth-service.js";
import { prisma } from "../config/prisma.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body;
    await authServices.register(userData);

    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userServices.getUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Incorrect email or password"
      );
    }

    const accessToken = generateToken(user.id, "access");
    const refreshToken = generateToken(user.id, "refresh");
    const refreshTokenExpiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await authServices.updateUserRefreshToken(
      user.id,
      refreshToken,
      refreshTokenExpiresAt
    );

    res.status(StatusCodes.OK).json({
      message: "User authenticated successfully",
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Not logged in yet");
    }

    const user = await userServices.getUserById(userId);

    res.status(StatusCodes.OK).json({
      message: "User data fetched successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).userId;

    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null, refreshTokenExpiresAt: null },
    });

    res.status(StatusCodes.OK).json({
      message: "Log out successfully",
    });
  } catch (err) {
    next(err);
  }
};
