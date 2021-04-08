import { Router } from 'express';

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
  providerDayAvailability.index
);

providersRouter.get('/:id/availability/month/:month/year/:year', providerMonthAvailability.index);

providersRouter.get('/appointments/day/:day/month/:month/year/:year', providerAppointments.index);

export default providersRouter;
