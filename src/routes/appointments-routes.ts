import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const appointmentsRouter = Router();

const appointments: any = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRouter;
