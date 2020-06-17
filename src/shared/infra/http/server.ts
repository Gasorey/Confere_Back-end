import 'reflect-metadata';
import 'dotenv';

import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import { createServer } from 'http';
import AppError from '@shared/errors/AppError';
import { setupWebSocket } from './websocket';

import routes from './routes';
import '@shared/infra/typeorm/';
import '@shared/containers';

const app = express();

const server = createServer(app);
setupWebSocket(server);

app.use(cors());

app.use(express.json());
app.use(routes);
app.use(errors());

// Error middlaware
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333');
});
