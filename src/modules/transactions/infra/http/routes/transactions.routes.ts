import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TransactionController from '../controllers/TransactionsController';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.use(ensureAuthenticated);

transactionRouter.post('/:payment_id', transactionController.create);
transactionRouter.get('/:payment_id', transactionController.index);

export default transactionRouter;
