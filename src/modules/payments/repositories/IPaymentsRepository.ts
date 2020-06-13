import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';
import Payment from '../infra/typeorm/entities/Payment';
import IUpdatePaymentDTO from '../dtos/IUpdatePaymentDTO';

export default interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>;
  findPaymentByID(id: string): Promise<Payment | undefined>;
  update(data: IUpdatePaymentDTO): Promise<Payment | undefined>;
  delete(id: string): Promise<void>;
  findPaymentsByUser(user_id: string): Promise<Payment[] | undefined>;
}
