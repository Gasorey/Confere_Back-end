import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
export default class CreatePaymentService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute({
    description,
    status,
    user_id,
  }: ICreatePaymentDTO): Promise<Payment> {
    const checkUser = await this.usersRepository.findById(user_id);

    if (!checkUser) {
      throw new AppError('the User does not exist');
    }

    const payment = await this.paymentsRepository.create({
      description,
      status,
      user_id,
    });
    return payment;
  }
}
