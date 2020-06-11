import { injectable, inject } from 'tsyringe';
import { isAfter, startOfMonth, parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ICardsRepository from '../repositories/ICardsRepository';
import Card from '../infra/typeorm/entities/Card';

interface IRequest {
  holder: string;
  cvv: string;
  number: string;
  expiry: string;
}

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
  }: IRequest): Promise<Card> {
    const formatExpiry = parseISO(expiry);
    const expiryDate = startOfMonth(formatExpiry);
    const currentDate = new Date(Date.now());
    const splitedNumber = number.slice(-4);

    const isValid = isAfter(expiryDate, currentDate);

    if (!isValid) {
      throw new AppError('This card is already expired');
    }

    const card = await this.cardsRepository.create({
      cvv,
      expiry: formatExpiry,
      holder,
      number: splitedNumber,
    });

    return card;
  }
}
export default CreateCardService;
