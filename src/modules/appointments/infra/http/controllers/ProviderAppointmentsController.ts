import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import IIndexController from '@shared/infra/http/controllers/interfaces/express/IIndexController';

class ProviderAppointmentsController implements IIndexController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: provider_id } = request.user;
    const { day, month, year } = request.params;

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: parseInt(day, 10),
      month: parseInt(month, 10),
      year: parseInt(year, 10)
    });

    return response.status(200).json(appointments);
  }
}

export default ProviderAppointmentsController;
