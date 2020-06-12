import Received from '@modules/received/infra/typeorm/entities/Received';
import ICreateReceivedDTO from '@modules/received/dtos/ICreateReceivedDTO';
import { uuid } from 'uuidv4';
import IReceivedRepository from '../IReceivedRepository';

export default class FakeReceivedRepository implements IReceivedRepository {
  private receives: Received[] = [];

  public async create(data: ICreateReceivedDTO): Promise<Received> {
    const received = new Received();

    Object.assign(received, { id: uuid(), ...data });

    this.receives.push(received);

    return received;
  }

  public async findById(id: string): Promise<Received | undefined> {
    const findReceived = this.receives.find(received => received.id === id);

    return findReceived;
  }
}
