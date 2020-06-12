import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

@injectable()
export default class DeletePaymentService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findPayment = await this.paymentsRepository.findPaymentByID(id);

    if (!findPayment) {
      throw new AppError('This payment was not found');
    }

    await this.paymentsRepository.delete(id);
  }
}
