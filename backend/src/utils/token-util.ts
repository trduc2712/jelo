import jwt, { JwtPayload } from 'jsonwebtoken';
import dayjs from 'dayjs';
import ms from 'ms';
import env from '../config/environment.js';
import { Request } from 'express';
import {
  ACCESS_TOKEN_EXPIRED_AT,
  REFRESH_TOKEN_EXPIRED_AT,
} from './constants.js';

export const generateToken = (userId: number, type: 'access' | 'refresh') => {
  const expiresIn =
    type === 'access' ? ACCESS_TOKEN_EXPIRED_AT : REFRESH_TOKEN_EXPIRED_AT;
  const iat = dayjs().unix();

  const payload = {
    sub: userId,
    iat,
  };

  return jwt.sign(payload, env.JWT_SECRET as string, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, env.JWT_SECRET as string);
};

export const generateAuthToken = (
  userId: number
): {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
} => {
  const accessToken = generateToken(userId, 'access');
  const refreshToken = generateToken(userId, 'refresh');
  const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return { accessToken, refreshToken, refreshTokenExpiresAt };
};

export const sendRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: ms(REFRESH_TOKEN_EXPIRED_AT),
  });
};
