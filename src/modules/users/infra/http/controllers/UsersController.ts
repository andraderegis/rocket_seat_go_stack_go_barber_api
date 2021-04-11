import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

import ICreateController from '@shared/infra/http/controllers/interfaces/express/ICreateController';

class UsersController implements ICreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password
    });

    return response.status(201).json(classToClass(user));
  }
}

export default UsersController;
