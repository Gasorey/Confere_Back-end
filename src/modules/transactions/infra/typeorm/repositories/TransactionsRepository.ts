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

  public async findTransactionByDescription(
    description: string,
  ): Promise<Transaction[] | undefined> {
    const transactions = await this.ormRepository.find({
      where: {
        description,
      },
    });
    return transactions;
  }

  public async findTransactionByInstallment(
    installment: string,
  ): Promise<Transaction[] | undefined> {
    const transactions = await this.ormRepository.find({
      where: {
        installment,
      },
    });
    return transactions;
  }

  public async findTransactionByType(
    type: string,
  ): Promise<Transaction[] | undefined> {
    const transactions = await this.ormRepository.find({
      where: {
        type,
      },
    });
    return transactions;
  }

  public async showTransactions(
    user_id: string,
  ): Promise<Transaction[] | undefined> {
    const transactions = await this.ormRepository.find({
      where: {
        user_id,
      },
    });
    return transactions;
  }

  public async delete(id: string): Promise<void> {
    const transaction = await this.ormRepository.find({
      where: {
        id,
      },
    });
    await this.ormRepository.remove(transaction);
  }
}
export default TransactionsRepository;
