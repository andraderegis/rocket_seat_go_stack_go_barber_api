import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import rateLimiterConf from '@config/rate-limiter';
import AppError from '@shared/errors/AppError';

const storeClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? parseFloat(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined
});

const limiter = new RateLimiterRedis({
  storeClient,
  ...rateLimiterConf
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
