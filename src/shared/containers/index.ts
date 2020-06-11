import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import CardsRepository from '@modules/cards/infra/typeorm/repositories/CardsRepository';
import IHashProvider from '@shared/providers/HashProvider/interface/IHashProvider';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ICardsRepository>(
  'CardsRepository',
  CardsRepository,
);
