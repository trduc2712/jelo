import { StatusCodes } from 'http-status-codes';
import env from './environment.js';
import ApiError from '../utils/ApiError.js';
import { WHITELIST_DOMAINS } from '../utils/constants.js';

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin && env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (WHITELIST_DOMAINS.includes(origin || '')) {
      return callback(null, true);
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `Access from ${origin} is blocked due to CORS policy`
      )
    );
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOptions;
