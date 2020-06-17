import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import UpdatePaymentService from '@modules/payments/services/UpdatePaymentsService';
import DeletePaymentService from '@modules/payments/services/DeletePaymentService';
import IndexPaymentService from '@modules/payments/services/IndexPaymentService';
import { sendMessage, findConnections } from '@shared/infra/http/websocket';

export default class PaymentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { status, description } = request.body;

    const createPayment = container.resolve(CreatePaymentService);

    const payment = await createPayment.execute({
      description,
      status,
      user_id,
    });

    const sendSocketMessageTo = findConnections(user_id);

    sendMessage({
      message: 'payment.create',
      to: sendSocketMessageTo,
      payment,
    });

    return response.json(payment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description, status } = request.body;
    const { id } = request.params;

    const updatePayment = container.resolve(UpdatePaymentService);

    const updatedPayment = await updatePayment.execute({
      description,
      id,
      status,
    });

    return response.json(updatedPayment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePayment = container.resolve(DeletePaymentService);

    await deletePayment.execute(id);

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const indexPayment = container.resolve(IndexPaymentService);

    const payments = await indexPayment.execute(user_id);

    return response.json(payments);
  }
}
