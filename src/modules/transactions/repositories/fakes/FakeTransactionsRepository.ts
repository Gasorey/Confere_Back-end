import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ICreateTransactionsDTO from '@modules/transactions/dtos/ICreateTransactionsDTO';
import { uuid } from 'uuidv4';
import ITransactionsRepository from '../ITransactionsRepository';

class FakeTransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  public async create(data: ICreateTransactionsDTO): Promise<Transaction> {
    const transaction = new Transaction();

    Object.assign(transaction, { id: uuid(), ...data });

    this.transactions.push(transaction);

    return transaction;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.transactions.findIndex(
      findTransaction => findTransaction.id === id,
    );

    if (findIndex > 0) {
      this.transactions.splice(findIndex, 1);
    }
  }

  public async findTransactionByDescription(
    description: string,
  ): Promise<Transaction[] | undefined> {
    const findTransaction = this.transactions.filter(
      transaction => transaction.description === description,
    );

    return findTransaction;
  }

  public async findTransactionByInstallment(
    installment: string,
  ): Promise<Transaction[] | undefined> {
    const findTransaction = this.transactions.filter(
      transaction => transaction.installment === installment,
    );

    return findTransaction;
  }

  public async findTransactionByType(
    type: string,
  ): Promise<Transaction[] | undefined> {
    const findTransaction = this.transactions.filter(
      transaction => transaction.type === type,
    );

    return findTransaction;
  }

  public async showTransactions(
    user_id: string,
  ): Promise<Transaction[] | undefined> {
    const findTransaction = this.transactions.filter(
      transaction => transaction.user_id === user_id,
    );
    return findTransaction;
  }
}
