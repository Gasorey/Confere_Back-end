import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePaymentsRepository: FakePaymentsRepository;

let createUser: CreateUserService;
let createPayment: CreatePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePaymentsRepository = new FakePaymentsRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPayment = new CreatePaymentService(
      fakeUsersRepository,
      fakePaymentsRepository,
    );
  });
  it('Should be able to create a payment', async () => {
    const user = await createUser.execute({
      name: 'Gabriel',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const payment = await createPayment.execute({
      description: 'Pagamento teste',
      status: 'Aguardando Pagamento',
      user_id: user.id,
    });
    expect(payment).toHaveProperty('id');
  });
  it('Should not be able to create a payment for a non-existing user', async () => {
    await expect(
      createPayment.execute({
        description: 'Pagamento teste',
        status: 'Aguardando Pagamento',
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
