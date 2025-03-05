import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "../services/user-service.js";
import { generateToken } from "../utils/token-util.js";
import { updateUserRefreshToken } from "../services/auth-service.js";
import env from "../config/environment.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body;
    await createUser(userData);

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

    const user = await getUserByEmail(email);
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

    await updateUserRefreshToken(user.id, refreshToken, refreshTokenExpiresAt);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      expires: refreshTokenExpiresAt,
    });

    res.status(StatusCodes.OK).json({
      message: "User authenticated successfully",
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};
