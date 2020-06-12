import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';
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
  }: ICreateReceivedDTO): Promise<Received> {
    if (!received_date) {
      const received = await this.receivedRepository.create({
        status,
        received_date: new Date(),
      });
      return received;
    }
    const received = await this.receivedRepository.create({
      status,
      received_date,
    });
    return received;
  }
}
