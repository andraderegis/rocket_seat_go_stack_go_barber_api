import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ICreateController from '@shared/infra/http/controllers/interfaces/express/ICreateController';

class AppointmentsControler implements ICreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const { provider_id, date } = request.body;

    const createAppointmentService = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmentService.execute({
      date,
      provider_id,
      user_id
    });

    return response.status(201).json(appointment);
  }
}

export default AppointmentsControler;
