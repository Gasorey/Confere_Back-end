import AppError from '@shared/errors/AppError';
import { parseISO } from 'date-fns';
import FakeReceivedRepository from '../repositories/fakes/FakeReceivedRepository';
import CreateReceivedService from './CreateReceivedService';

let fakeReceivedRepository: FakeReceivedRepository;
let createReceived: CreateReceivedService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakeReceivedRepository = new FakeReceivedRepository();
    createReceived = new CreateReceivedService(fakeReceivedRepository);
  });

  it('Should be able to create a received without a received_date', async () => {
    const received = await createReceived.execute({
      status: 'expected',
    });
    expect(received).toHaveProperty('id');
  });
  it('Should be able to create a received with a received_date', async () => {
    const received = await createReceived.execute({
      status: 'expected',
      received_date: new Date(2025, 4),
    });
    expect(received.received_date).toEqual(new Date(2025, 4));
  });
});
