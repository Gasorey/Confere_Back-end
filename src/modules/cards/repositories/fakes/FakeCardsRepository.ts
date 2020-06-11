import Card from '@modules/cards/infra/typeorm/entities/Card';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import { uuid } from 'uuidv4';
import ICardsRepository from '../ICardsRepository';

class FakeCardsRepository implements ICardsRepository {
  private cards: Card[] = [];

  public async create({
    cvv,
    expiry,
    holder,
    number,
  }: ICreateCardDTO): Promise<Card> {
    const card = new Card();

    Object.assign(card, { id: uuid(), cvv, expiry, holder, number });

    this.cards.push(card);

    return card;
  }
}

export default FakeCardsRepository;
