import AppError from '@shared/errors/AppError';
import { parseISO } from 'date-fns';
import FakeCardsRepository from '../repositories/fakes/FakeCardsRepository';
import CreateCardService from './CreateCardService';

let fakeCardsRepository: FakeCardsRepository;
let createCard: CreateCardService;

describe('CreateCard', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    createCard = new CreateCardService(fakeCardsRepository);
  });
  it('Should be able to create a card', async () => {
    const card = await createCard.execute({
      cvv: '123',
      expiry: '2024-04',
      holder: 'Gabriel Asorey',
      number: '123456789',
    });
    expect(card).toHaveProperty('id');
  });
  it('Should not be able to create a card with an expired card', async () => {
    await expect(
      createCard.execute({
        cvv: '123',
        expiry: '2019-04',
        holder: 'Gabriel Asorey',
        number: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
