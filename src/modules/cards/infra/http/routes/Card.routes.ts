import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CardController from '../controllers/CardControllers';

const cardRouter = Router();

const cardController = new CardController();

cardRouter.use(ensureAuthenticated);

cardRouter.post('/', cardController.create);

export default cardRouter;
