import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import { uuid } from 'uuidv4';
import IUpdatePaymentDTO from '@modules/payments/dtos/IUpdatePaymentDTO';
import IPaymentsRepository from '../IPaymentsRepository';

export default class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  public async create(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();

    Object.assign(payment, { id: uuid(), ...data });

    this.payments.push(payment);

    return payment;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.payments.findIndex(
      findPayment => findPayment.id === id,
    );

    if (findIndex > -1) {
      this.payments.slice(findIndex, 1);
    }
  }

  public async update(data: IUpdatePaymentDTO): Promise<Payment> {
    const { status, id, description } = data;
    const findIndex = this.payments.findIndex(
      findPayment => findPayment.id === id,
    );

    const payment = this.payments[findIndex];

    payment.description = description;
    payment.status = status;

    return payment;
  }

  public async findPaymentByID(id: string): Promise<Payment | undefined> {
    const findPayment = this.payments.find(payment => payment.id === id);
    return findPayment;
  }
}
