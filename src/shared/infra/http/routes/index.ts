import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import authenticateRouter from '@modules/users/infra/http/routes/authenticate.routes';
import cardRouter from '@modules/cards/infra/http/routes/Card.routes';
import paymentRouter from '@modules/payments/infra/http/routes/payment.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/login', authenticateRouter);
routes.use('/card', cardRouter);
routes.use('/payment', paymentRouter);

export default routes;
