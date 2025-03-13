import express from 'express';
import cors from 'cors';
import corsOptions from './config/cors.js';
import errorHandler from './middlewares/error-middleware.js';
import categoryRoutes from './routes/v1/category-route.js';
import authRoutes from './routes/v1/auth-route.js';
import userRoutes from './routes/v1/user-route.js';
import env from './config/environment.js';
import { authenticateToken } from './middlewares/auth-middleware.js';
import cookieParser from 'cookie-parser';
import startCronJobs from './cron.js';

const app = express();
const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(authenticateToken);

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.use(errorHandler);

startCronJobs();
