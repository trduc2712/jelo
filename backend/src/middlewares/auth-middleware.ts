import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import { WHITELIST_ROUTES } from "../utils/constants.js";
import { verifyToken } from "../utils/token-util.js";

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (WHITELIST_ROUTES.some((route) => req.path.endsWith(route))) {
    return next();
  }

  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodedToken = verifyToken(token);
      const userId = Number(decodedToken.sub);

      req.body.userId = userId;
      next();
    } catch (err) {
      next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Token has expired or is invalid"
        )
      );
    }
  } else {
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Token is missing"));
  }
};

export default verifyAccessToken;
