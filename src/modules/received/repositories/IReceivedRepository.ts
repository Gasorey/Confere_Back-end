import Received from '../infra/typeorm/entities/Received';
import ICreateReceivedDTO from '../dtos/ICreateReceivedDTO';

export default interface IReceivedRepository {
  create(data: ICreateReceivedDTO): Promise<Received>;
  findById(id: string): Promise<Received | undefined>;
}
