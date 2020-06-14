import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ICreateTransactionsDTO from '@modules/transactions/dtos/ICreateTransactionsDTO';
import { uuid } from 'uuidv4';
import ITransactionsRepository from '../ITransactionsRepository';

export default class FakeTransactionsRepository
  implements ITransactionsRepository {
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

  public async findByDescription(
    description: string,
  ): Promise<Transaction[] | undefined> {
    const findTransaction = this.transactions.filter(
      transaction => transaction.description === description,
    );

    return findTransaction;
  }

  public async findByInstallment(
    installment: number,
  ): Promise<Transaction[] | undefined> {
    const findTransaction = this.transactions.filter(
      transaction => transaction.installment === installment,
    );

    return findTransaction;
  }

  public async findByType(type: string): Promise<Transaction[] | undefined> {
    const findTransaction = this.transactions.filter(
      transaction => transaction.type === type,
    );

    return findTransaction;
  }

  public async findByPaymentId(
    payment_id: string,
  ): Promise<Transaction | undefined> {
    const findTransaction = this.transactions.find(
      transaction => transaction.payment_id === payment_id,
    );

    return findTransaction;
  }
}
