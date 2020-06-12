import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';
import UpdatePaymentService from './UpdatePaymentsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePaymentsRepository: FakePaymentsRepository;

let createUser: CreateUserService;
let createPayment: CreatePaymentService;
let updatePayment: UpdatePaymentService;

describe('UpdatePayment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePaymentsRepository = new FakePaymentsRepository();

    updatePayment = new UpdatePaymentService(fakePaymentsRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPayment = new CreatePaymentService(
      fakeUsersRepository,
      fakePaymentsRepository,
    );
  });
  it('Should be able to update a payment', async () => {
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
    const updatedPayment = await updatePayment.execute({
      description: 'Pagamento Atualizado',
      status: 'Pagamento completo',
      id: payment.id,
    });
    expect(updatedPayment?.description).toBe('Pagamento Atualizado');
  });
  it('Should not be to update a non-existing payment', async () => {
    await expect(
      updatePayment.execute({
        description: 'Pagamento teste',
        status: 'Aguardando Pagamento',
        id: 'non-existing id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
