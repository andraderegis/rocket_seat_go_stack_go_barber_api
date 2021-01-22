import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/appointment-repository';
import CreateAppointmentService from '../services/create-appointment-service';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (_, response) => {
  const appointments = appointmentRepository.all();

  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(appointmentRepository);

    const appointment = createAppointmentService.execute({ provider, date: parsedDate });

    return response.status(201).json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
