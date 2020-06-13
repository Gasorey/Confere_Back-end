import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TransactionController from '../controllers/TransactionsController';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.use(ensureAuthenticated);

transactionRouter.post('/', transactionController.create);

export default transactionRouter;
