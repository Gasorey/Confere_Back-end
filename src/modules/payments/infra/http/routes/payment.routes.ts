import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PaymentController from '../controllers/PaymentController';

const paymentRouter = Router();

const paymentController = new PaymentController();

paymentRouter.use(ensureAuthenticated);

paymentRouter.post('/', paymentController.create);
paymentRouter.put('/:id', paymentController.update);
paymentRouter.delete('/:id', paymentController.delete);

export default paymentRouter;
