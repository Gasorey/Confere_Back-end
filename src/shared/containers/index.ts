import { container } from 'tsyringe';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/interface/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
