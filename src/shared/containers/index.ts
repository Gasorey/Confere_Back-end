import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import CardsRepository from '@modules/cards/infra/typeorm/repositories/CardsRepository';
import IHashProvider from '@shared/providers/HashProvider/interface/IHashProvider';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import PaymentsRepository from '@modules/payments/infra/typeorm/repositories/PaymentsRepository';
import IReceivedRepository from '@modules/received/repositories/IReceivedRepository';
import ReceivedRepository from '@modules/received/infra/typeorm/repositories/ReceivedRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPaymentsRepository>(
  'PaymentsRepository',
  PaymentsRepository,
);

container.registerSingleton<IReceivedRepository>(
  'ReceivedRepository',
  ReceivedRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ICardsRepository>(
  'CardsRepository',
  CardsRepository,
);
