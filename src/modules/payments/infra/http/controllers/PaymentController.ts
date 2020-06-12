import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import UpdatePaymentService from '@modules/payments/services/UpdatePaymentsService';
import DeletePaymentService from '@modules/payments/services/DeletePaymentService';

export default class PaymentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { status, description } = request.body;

    const createPayment = container.resolve(CreatePaymentService);

    const payment = createPayment.execute({
      description,
      status,
      user_id,
    });
    return response.json(payment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description, status } = request.body;
    const { id } = request.params;

    const updatePayment = container.resolve(UpdatePaymentService);

    const updatedPayment = updatePayment.execute({
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
}
