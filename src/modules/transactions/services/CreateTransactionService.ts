import { injectable, inject } from 'tsyringe';
import IReceivedRepository from '@modules/received/repositories/IReceivedRepository';
import { addMonths } from 'date-fns';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

interface ICard {
  number: string;
  expiry: Date;
  cvv: string;
  holder: string;
}

interface IRequest {
  payment_id: string;
  value: number;
  description: string;
  type: 'debit' | 'credit' | 'installment_credit';
  installment: undefined | number;
  card: ICard;
}

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
    payment_id,
    description,
    installment,
    type,
    value,
    card,
  }: IRequest): Promise<Transaction> {
    switch (type) {
      case 'debit': {
        const createCard = await this.cardsRepository.create(card);
        const transaction = await this.transactionsRepository.create({
          payment_id,
          description,
          installment: undefined,
          type: 'debit',
          value: value * 0.972,
          card_id: createCard.id,
        });

        await this.receivedRepository.create({
          transaction_id: transaction.id,
          status: 'received',
          received_date: new Date(),
        });

        return transaction;
      }
      case 'credit': {
        const currentDate = new Date();
        const receivedDate = addMonths(currentDate, 1);
        const createCard = await this.cardsRepository.create(card);
        const transaction = await this.transactionsRepository.create({
          payment_id,
          description,
          installment: 1,
          type,
          value: value * 0.968,
          card_id: createCard.id,
        });
        await this.receivedRepository.create({
          transaction_id: transaction.id,
          status: 'expected',
          received_date: receivedDate,
        });

        return transaction;
      }
      case 'installment_credit': {
        if (!installment) {
          throw new AppError('Please inform installment');
        }

        const createCard = await this.cardsRepository.create(card);
        const tax = [...Array(6).keys()].includes(installment - 1)
          ? 0.962
          : 0.958;
        const transaction = await this.transactionsRepository.create({
          payment_id,
          description,
          installment,
          type,
          value: value * tax,
          card_id: createCard.id,
        });

        const cicles = installment;
        for (let i = 1; i <= cicles; i += 1) {
          this.receivedRepository.create({
            transaction_id: transaction.id,
            status: 'expected',
            received_date: addMonths(new Date(), i),
          });
        }
        return transaction;
      }
      default:
        throw new AppError('Transaction type unsupported');
    }
  }
}
