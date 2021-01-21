import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';

import AppointmentRepository from '../repositories/appointment-repository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (_, response) => {
  const appointments = appointmentRepository.all();

  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentRepository.create({ provider, date: parsedDate });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
