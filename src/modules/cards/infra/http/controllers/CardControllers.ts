import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCardService from '@modules/cards/services/CreateCardService';

export default class CardController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { holder, cvv, number, expiry } = request.body;

    const createCard = container.resolve(CreateCardService);

    await createCard.execute({
      cvv,
      expiry,
      holder,
      number,
    });
    return response.status(200).send();
  }
}
