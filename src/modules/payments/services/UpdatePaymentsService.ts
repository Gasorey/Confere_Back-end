import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';
import IUpdatePaymentDTO from '../dtos/IUpdatePaymentDTO';

@injectable()
export default class UpdatePaymentService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute(data: IUpdatePaymentDTO): Promise<Payment | undefined> {
    const { id, description, status } = data;

    const findPayment = await this.paymentsRepository.findPaymentByID(id);

    if (!findPayment) {
      throw new AppError('This payment was not found');
    }

    const payment = await this.paymentsRepository.update({
      description,
      id,
      status,
    });

    return payment;
  }
}
