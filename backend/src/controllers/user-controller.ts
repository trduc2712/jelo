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
    const user = req.body;
    await userServices.createUser(user);

    res.status(StatusCodes.OK).json({ message: "Create user successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await userServices.deleteUserById(Number(userId));

    res.status(StatusCodes.OK).json({ message: "Delete user successfully" });
  } catch (err) {
    next(err);
  }
};
