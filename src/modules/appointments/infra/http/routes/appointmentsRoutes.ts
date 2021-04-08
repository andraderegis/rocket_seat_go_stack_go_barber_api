import { Router } from 'express';

import AppointmentsControler from '@modules/appointments/infra/http/controllers/AppointmentsControler';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticatedMiddleware';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsControler();

appointmentsRouter.use(ensureAuthenticatedMiddleware);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
