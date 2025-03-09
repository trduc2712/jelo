import 'dotenv/config';

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
