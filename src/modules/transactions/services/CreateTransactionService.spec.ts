import FakeReceivedRepository from '@modules/received/repositories/fakes/FakeReceivedRepository';
import FakeCardsRepository from '@modules/cards/repositories/fakes/FakeCardsRepository';
import AppError from '@shared/errors/AppError';
import CreateTransactionService from './CreateTransactionService';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeReceivedRepository: FakeReceivedRepository;
let fakeCardsRepository: FakeCardsRepository;

let createTransaction: CreateTransactionService;

describe('Create Transactions', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeReceivedRepository = new FakeReceivedRepository();
    fakeCardsRepository = new FakeCardsRepository();

    createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
      fakeCardsRepository,
      fakeReceivedRepository,
    );
  });
  it('Should be able to create a new debit transaction', async () => {
    const transaction = await createTransaction.execute({
      card: {
        cvv: '123',
        expiry: new Date(2024, 5),
        holder: 'Gabriel Asorey',
        number: '1234123234',
      },
      description: 'Test transaction',
      payment_id: 'payment_id',
      type: 'debit',
      value: 100,
      installment: undefined,
    });
    expect(transaction).toHaveProperty('id');
  });
  it('Should be able to create a new credit transaction', async () => {
    const transaction = await createTransaction.execute({
      card: {
        cvv: '123',
        expiry: new Date(2024, 5),
        holder: 'Gabriel Asorey',
        number: '1234123234',
      },
      description: 'Test transaction',
      payment_id: 'payment_id',
      type: 'credit',
      value: 100,
      installment: 1,
    });
    expect(transaction).toHaveProperty('id');
  });
  it('Should be able to create a new installment_credit transaction with 3.8% tax fee', async () => {
    const transaction = await createTransaction.execute({
      card: {
        cvv: '123',
        expiry: new Date(2024, 5),
        holder: 'Gabriel Asorey',
        number: '1234123234',
      },
      description: 'Test transaction',
      payment_id: 'payment_id',
      type: 'installment_credit',
      value: 100,
      installment: 5,
    });
    expect(transaction).toHaveProperty('id');
  });
  it('Should be able to create a new installment_credit transaction with 4.2% tax fee', async () => {
    const transaction = await createTransaction.execute({
      card: {
        cvv: '123',
        expiry: new Date(2024, 5),
        holder: 'Gabriel Asorey',
        number: '1234123234',
      },
      description: 'Test transaction',
      payment_id: 'payment_id',
      type: 'installment_credit',
      value: 100,
      installment: 12,
    });
    expect(transaction).toHaveProperty('id');
  });
  it('Should not be able to create a installment_credit transaction without installment', async () => {
    await expect(
      createTransaction.execute({
        card: {
          cvv: '123',
          expiry: new Date(2024, 5),
          holder: 'Gabriel Asorey',
          number: '1234123234',
        },
        description: 'Test transaction',
        payment_id: 'payment_id',
        type: 'installment_credit',
        value: 100,
        installment: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to create a transaction with a non recognized type', async () => {
    await expect(
      createTransaction.execute({
        card: {
          cvv: '123',
          expiry: new Date(2024, 5),
          holder: 'Gabriel Asorey',
          number: '1234123234',
        },
        description: 'Test transaction',
        payment_id: 'payment_id',
        type: 'anything here',
        value: 100,
        installment: 12,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
