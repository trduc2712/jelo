import jwt from 'jsonwebtoken';
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

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET as string);
};
