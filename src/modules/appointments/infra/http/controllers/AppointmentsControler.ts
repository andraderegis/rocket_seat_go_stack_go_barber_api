import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

class AppointmentsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
      user_id
    });

    return response.status(201).json(appointment);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const appointmentRespository = new AppointmentRepository();

    const appointments = await appointmentRespository.find();

    return response.status(200).json(appointments);
  }
}

export default AppointmentsControler;
