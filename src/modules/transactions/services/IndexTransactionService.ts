import { injectable, inject } from 'tsyringe';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

@injectable()
export default class IndexTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(payment_id: string): Promise<Transaction | undefined> {
    const transaction = await this.transactionsRepository.findByPaymentId(
      payment_id,
    );

    return transaction;
  }
}
