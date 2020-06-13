import { inject, injectable } from 'tsyringe';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
export default class IndexPaymentService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute(user_id: string): Promise<Payment[] | undefined> {
    const payments = await this.paymentsRepository.findPaymentsByUser(user_id);

    return payments;
  }
}
