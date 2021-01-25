import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/appointment-repository';
import CreateAppointmentService from '../services/create-appointment-service';

import ensureAuthenticatedMiddleware from '../middlewares/ensure-authenticated-middleware';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticatedMiddleware);

appointmentsRouter.get('/', async (_, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();

  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });

    return response.status(201).json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
