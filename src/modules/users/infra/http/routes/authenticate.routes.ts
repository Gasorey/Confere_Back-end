import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AuthenticateController from '../controllers/AuthenticateUserController';

const authenticateRouter = Router();

const authenticateController = new AuthenticateController();

authenticateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  authenticateController.create,
);

export default authenticateRouter;
