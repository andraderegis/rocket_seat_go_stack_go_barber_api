import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticatedMiddleware from '../middlewares/ensureAuthenticatedMiddleware';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticatedMiddleware);

appointmentsRouter.get('/', async (_, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();

  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
