import Card from '../infra/typeorm/entities/Card';
import ICreateCardDTO from '../dtos/ICreateCardDTO';

export default interface ICardsRepository {
  create(data: ICreateCardDTO): Promise<Card>;
}
