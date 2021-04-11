import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AppointmentsControler from '@modules/appointments/infra/http/controllers/AppointmentsControler';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticatedMiddleware';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsControler();

appointmentsRouter.use(ensureAuthenticatedMiddleware);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required()
    }
  }),
  appointmentsController.create
);

export default appointmentsRouter;
