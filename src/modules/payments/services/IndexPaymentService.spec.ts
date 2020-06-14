import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';
import IndexPaymentService from './IndexPaymentService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePaymentsRepository: FakePaymentsRepository;

let createUser: CreateUserService;
let createPayment: CreatePaymentService;
let indexPayment: IndexPaymentService;

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
    indexPayment = new IndexPaymentService(fakePaymentsRepository);
  });
  it('Should be able to create a payment', async () => {
    const user = await createUser.execute({
      name: 'Gabriel',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    await createPayment.execute({
      description: 'Pagamento teste',
      status: 'Aguardando Pagamento',
      user_id: user.id,
    });
    const list = await indexPayment.execute(user.id);
    expect(list?.length).toEqual(1);
  });
});
