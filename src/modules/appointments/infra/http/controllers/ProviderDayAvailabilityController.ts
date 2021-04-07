import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProvidersService from '@modules/appointments/services/ListProviderDayAvailabilityService';

import IIndexController from '@shared/infra/http/controllers/interfaces/express/IIndexController';

class ProviderDayAvailabilityController implements IIndexController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: provider_id, day, month, year } = request.params;

    const listProvidersService = container.resolve(ListProvidersService);

    const availabilities = await listProvidersService.execute({
      provider_id,
      day: parseInt(day, 10),
      month: parseInt(month, 10),
      year: parseInt(year, 10)
    });

    return response.status(200).json(availabilities);
  }
}

export default ProviderDayAvailabilityController;
