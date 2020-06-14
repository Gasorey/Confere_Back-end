import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import IndexTransactionService from '@modules/transactions/services/IndexTransactionService';

export default class TransactionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { payment_id } = request.params;

    const {
      card: { number, expiry, cvv, holder },
      value,
      description,
      type,
      installment,
    } = request.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      payment_id,
      description,
      installment,
      type,
      value,
      card: {
        cvv,
        expiry,
        holder,
        number,
      },
    });
    return response.json(transaction);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { payment_id } = request.params;

    const findTransaction = container.resolve(IndexTransactionService);

    const transaction = await findTransaction.execute(payment_id);

    return response.json(transaction);
  }
}
