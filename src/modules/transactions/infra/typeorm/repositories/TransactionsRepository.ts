import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateTransactionsDTO from '@modules/transactions/dtos/ICreateTransactionsDTO';
import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(
    transactionData: ICreateTransactionsDTO,
  ): Promise<Transaction> {
    const transaction = this.ormRepository.create(transactionData);

    await this.ormRepository.save(transaction);

    return transaction;
  }
}
export default TransactionsRepository;
