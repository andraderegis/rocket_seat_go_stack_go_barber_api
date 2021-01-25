import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticatedMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('JWT token is missing.');
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
    throw new Error('Invalid JWT Token');
  }
}
