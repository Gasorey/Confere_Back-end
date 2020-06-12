import ICreateTransactionsDTO from '../dtos/ICreateTransactionsDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<Transaction>;
  delete(id: string): Promise<void>;
  findByDescription(description: string): Promise<Transaction[] | undefined>;
  findByType(type: string): Promise<Transaction[] | undefined>;
  findByInstallment(installment: string): Promise<Transaction[] | undefined>;
  findByPaymentId(payment_id: string): Promise<Transaction | undefined>;
}
