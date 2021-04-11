import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticatedMiddleware';

const providersRouter = Router();
const providerAppointments = new ProviderAppointmentsController();
const providersController = new ProvidersController();
const providerDayAvailability = new ProviderDayAvailabilityController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticatedMiddleware);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:id/availability/day/:day/month/:month/year/:year',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required()
    }
  }),
  providerDayAvailability.index
);

providersRouter.get(
  '/:id/availability/month/:month/year/:year',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      month: Joi.number().required(),
      year: Joi.number().required()
    }
  }),
  providerMonthAvailability.index
);

providersRouter.get(
  '/appointments/day/:day/month/:month/year/:year',
  celebrate({
    [Segments.PARAMS]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required()
    }
  }),
  providerAppointments.index
);

export default providersRouter;
