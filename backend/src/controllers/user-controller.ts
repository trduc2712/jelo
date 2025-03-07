import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userServices } from "../services/user-service.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userServices.getAllUsers();

    res
      .status(StatusCodes.OK)
      .json({ message: "Get all users successfully", users });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userServices.createUser(req.body);

    res.status(StatusCodes.OK).json({ message: "Create user successfully" });
  } catch (err) {
    next(err);
  }
};
