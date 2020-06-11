import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import Card from '../entities/Card';

class CardsRepository implements ICardsRepository {
  private ormRepository: Repository<Card>;

  constructor() {
    this.ormRepository = getRepository(Card);
  }

  public async create({
    number,
    holder,
    expiry,
    cvv,
  }: ICreateCardDTO): Promise<Card> {
    const card = this.ormRepository.create({
      cvv,
      expiry,
      holder,
      number,
    });

    await this.ormRepository.save(card);

    return card;
  }
}

export default CardsRepository;
