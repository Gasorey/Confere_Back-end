import FakeReceivedRepository from '@modules/received/repositories/fakes/FakeReceivedRepository';
import FakeCardsRepository from '@modules/cards/repositories/fakes/FakeCardsRepository';
import CreateTransactionService from './CreateTransactionService';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import IndexTransactionService from './IndexTransactionService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeReceivedRepository: FakeReceivedRepository;
let fakeCardsRepository: FakeCardsRepository;

let createTransaction: CreateTransactionService;
let indexTransaction: IndexTransactionService;

describe('Create Transactions', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeReceivedRepository = new FakeReceivedRepository();
    fakeCardsRepository = new FakeCardsRepository();

    indexTransaction = new IndexTransactionService(fakeTransactionsRepository);
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
    const findTransaction = await indexTransaction.execute(
      transaction.payment_id,
    );
    expect(findTransaction);
  });
});
