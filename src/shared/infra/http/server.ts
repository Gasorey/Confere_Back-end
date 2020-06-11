import 'reflect-metadata';
import 'dotenv';
import { errors } from 'celebrate';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import '@shared/containers';
import '@shared/infra/typeorm/index';
import routes from './routes';

const app = express();

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

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
