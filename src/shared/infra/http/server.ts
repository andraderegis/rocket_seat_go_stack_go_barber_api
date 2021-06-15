import 'reflect-metadata';
import '@config/environment';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';

import rateLimiterMiddleware from '@shared/infra/http/middlewares/rateLimiterMiddleware';

import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiterMiddleware);
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errors());

app.get('/healthz', (_: Request, response: Response) => {
  response.send({
    server: 'ok'
  });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

app.listen(3333, () => {
  console.log('Server running in 3333 port.');
});
