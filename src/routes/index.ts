import { Router } from 'express';

import appointmentsRouter from './appointmentsRoutes';
import sessionsRouter from './sessionsRoutes';
import usersRouter from './usersRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
