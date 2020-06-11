import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import UsersController from '../controllers/CreateUserController';

const userRouter = Router();

const usersController = new UsersController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  usersController.create,
);

export default userRouter;
