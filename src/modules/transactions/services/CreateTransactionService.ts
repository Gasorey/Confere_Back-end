import { injectable, inject } from 'tsyringe';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IReceivedRepository from '@modules/received/repositories/IReceivedRepository';
import { format, parseISO, addMonths } from 'date-fns';
import { Between } from 'typeorm';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import ICreateTransactionsDTO from '../dtos/ICreateTransactionsDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

@injectable()
export default class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,

    @inject('ReceivedRepository')
    private receivedRepository: IReceivedRepository,
  ) {}

  public async execute({
    description,
    installment,
    type,
    value,
    card,
  }: ICreateTransactionsDTO): Promise<Transaction> {
    if (type === 'debit') {
      const createCard = await this.cardsRepository.create(card);
      const received = await this.receivedRepository.create({
        status: 'received',
        received_date: new Date(),
      });
      const transaction = await this.transactionsRepository.create({
        description,
        installment: undefined,
        card: createCard,
        type,
        value: value * 0.972,
        received,
      });
      return transaction;
    }
    if (type === 'credit') {
      const createCard = await this.cardsRepository.create(card);
      const currentDate = new Date();
      const receivedDate = addMonths(currentDate, 1);
      const received = await this.receivedRepository.create({
        status: 'expected',
        received_date: receivedDate,
      });
      const transaction = await this.transactionsRepository.create({
        description,
        installment: 1,
        card: createCard,
        type,
        value: value * 0.968,
        received,
      });

      return transaction;
    }

    for (let i = 0; i < installment; i++) {
      this.receivedRepository.create({
        status: 'expected',
        received_date: addMonths(new Date(), i),
      });
    }
  }
}
