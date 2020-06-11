import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import authenticateRouter from '@modules/users/infra/http/routes/authenticate.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/login', authenticateRouter);

export default routes;
