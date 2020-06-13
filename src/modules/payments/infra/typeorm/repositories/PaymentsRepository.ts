import { Repository, getRepository } from 'typeorm';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import AppError from '@shared/errors/AppError';
import IUpdatePaymentDTO from '@modules/payments/dtos/IUpdatePaymentDTO';
import Payment from '../entities/Payment';

export default class PaymentsRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  public async create({
    description,
    status,
    user_id,
  }: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.ormRepository.create({
      description,
      status,
      user_id,
    });

    await this.ormRepository.save(payment);

    return payment;
  }

  public async update(data: IUpdatePaymentDTO): Promise<Payment | undefined> {
    const { description, status, id } = data;

    const payment = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    if (!payment) {
      throw new AppError('payment was not found');
    }

    payment.description = description;
    payment.status = status;

    await this.ormRepository.save(payment);

    return payment;
  }

  public async delete(id: string): Promise<void> {
    const payment = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    if (payment) {
      await this.ormRepository.remove(payment);
    }
  }

  public async findPaymentByID(id: string): Promise<Payment | undefined> {
    const payment = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return payment;
  }

  public async findPaymentsByUser(
    user_id: string,
  ): Promise<Payment[] | undefined> {
    const payments = await this.ormRepository.find({
      relations: ['transaction', 'transaction.received'],
      where: {
        user_id,
      },
    });
    return payments;
  }
}
