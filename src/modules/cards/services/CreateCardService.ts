import { injectable, inject } from 'tsyringe';
import { isAfter, startOfMonth, parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ICardsRepository from '../repositories/ICardsRepository';
import Card from '../infra/typeorm/entities/Card';
import ICreateCardDTO from '../dtos/ICreateCardDTO';

@injectable()
class CreateCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({
    cvv,
    expiry,
    holder,
    number,
  }: ICreateCardDTO): Promise<Card> {
    // const formatExpiry = parseISO(expiry);
    const currentDate = new Date(Date.now());
    const splitedNumber = number.slice(-4);

    const isValid = isAfter(expiry, currentDate);

    if (!isValid) {
      throw new AppError('This card is already expired');
    }

    const card = await this.cardsRepository.create({
      cvv,
      expiry,
      holder,
      number: splitedNumber,
    });

    return card;
  }
}
export default CreateCardService;
