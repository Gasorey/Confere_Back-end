import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to authenticate the user', async () => {
    const user = await fakeUserRepository.create({
      name: 'Gabriel',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const response = await authenticateUser.execute({
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('Should not be able to authenticate with non-existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'gasorey@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Gabriel',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    await expect(
      authenticateUser.execute({
        email: 'gasorey@gmail.com',
        password: '1adwfgwefwe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
