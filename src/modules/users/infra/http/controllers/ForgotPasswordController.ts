import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

import ICreateController from '@shared/infra/http/controllers/interfaces/express/ICreateController';

class ForgotPasswordController implements ICreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService);

    await sendForgotPasswordEmailService.execute({
      email
    });

    return response.status(204).send();
  }
}

export default ForgotPasswordController;
