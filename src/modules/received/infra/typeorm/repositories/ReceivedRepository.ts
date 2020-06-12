import IReceivedRepository from '@modules/received/repositories/IReceivedRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateReceivedDTO from '@modules/received/dtos/ICreateReceivedDTO';
import { formatDistanceToNow } from 'date-fns';
import Received from '../entities/Received';

export default class ReceivedRepository implements IReceivedRepository {
  private ormRepository: Repository<Received>;

  constructor() {
    this.ormRepository = getRepository(Received);
  }

  public async create({
    status,
    received_date,
  }: ICreateReceivedDTO): Promise<Received> {
    const received = this.ormRepository.create({
      status,
      received_date,
    });
    await this.ormRepository.save(received);
    return received;
  }

  public async findById(id: string): Promise<Received | undefined> {
    const received = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return received;
  }
}
