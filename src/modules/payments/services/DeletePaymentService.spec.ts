import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';
import DeletePaymentService from './DeletePaymentService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePaymentsRepository: FakePaymentsRepository;

let createUser: CreateUserService;
let createPayment: CreatePaymentService;
let deletePayment: DeletePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePaymentsRepository = new FakePaymentsRepository();

    deletePayment = new DeletePaymentService(fakePaymentsRepository);
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
    await deletePayment.execute(payment.id);
    expect(!payment);
  });
  it('Should not be able to delete a non-existing payment', async () => {
    await expect(
      deletePayment.execute('non-existing payment'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
