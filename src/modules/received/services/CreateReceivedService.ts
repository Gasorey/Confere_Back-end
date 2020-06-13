import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IReceivedRepository from '../repositories/IReceivedRepository';
import ICreateReceivedDTO from '../dtos/ICreateReceivedDTO';
import Received from '../infra/typeorm/entities/Received';

@injectable()
export default class CreateReceivedService {
  constructor(
    @inject('ReceivedRepository')
    private receivedRepository: IReceivedRepository,
  ) {}

  public async execute({
    status,
    received_date,
    transaction_id,
  }: ICreateReceivedDTO): Promise<Received> {
    if (!received_date) {
      const received = await this.receivedRepository.create({
        transaction_id,
        status,
        received_date: new Date(),
      });
      return received;
    }
    const received = await this.receivedRepository.create({
      transaction_id,
      status,
      received_date,
    });
    return received;
  }
}
