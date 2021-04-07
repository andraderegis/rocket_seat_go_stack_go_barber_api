import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import ICreateController from '@shared/infra/http/controllers/interfaces/express/ICreateController';

class SessionsController implements ICreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password
    });

    return response.status(200).json({ user, token });
  }
}

export default SessionsController;
