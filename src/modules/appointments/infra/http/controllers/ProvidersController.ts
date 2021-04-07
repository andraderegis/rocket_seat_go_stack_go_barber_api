import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import IIndexController from '@shared/infra/http/controllers/interfaces/express/IIndexController';

class ProvidersController implements IIndexController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({ user_id });

    return response.status(200).json(providers);
  }
}

export default ProvidersController;
