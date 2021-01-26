import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticatedMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const { secret } = authConfig.jwt;

    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
