import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

import ICreateController from '@shared/infra/http/controllers/interfaces/express/ICreateController';

class ResetPasswordController implements ICreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      password,
      token
    });

    return response.status(204).send();
  }
}

export default ResetPasswordController;
