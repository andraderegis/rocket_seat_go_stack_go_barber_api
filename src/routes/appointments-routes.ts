import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { isEqual, parseISO, startOfHour } from 'date-fns';
import Appointement from '../models/appointment';

const appointmentsRouter = Router();

const appointments: Appointement[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  );

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointement(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRouter;
