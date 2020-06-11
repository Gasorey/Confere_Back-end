import ICreateTransactionsDTO from '../dtos/ICreateTransactionsDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<Transaction>;
  findTransactionByValueDSC(
    user_id: string,
  ): Promise<Transaction[] | undefined>;
  findTransactionByValueASC(
    user_id: string,
  ): Promise<Transaction[] | undefined>;
  findTransactionByDescription(
    description: string,
  ): Promise<Transaction[] | undefined>;
  findTransactionByType(type: string): Promise<Transaction[] | undefined>;
  findTransactionByInstallment(
    installment: string,
  ): Promise<Transaction[] | undefined>;
}
