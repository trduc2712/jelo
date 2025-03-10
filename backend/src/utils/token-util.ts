import jwt, { JwtPayload } from 'jsonwebtoken';
import dayjs from 'dayjs';
import env from '../config/environment.js';

export const generateToken = (userId: number, type: 'access' | 'refresh') => {
  const expiresIn = type === 'access' ? '1d' : '7d';
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
