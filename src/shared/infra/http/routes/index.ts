import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointmentsRoutes';
import passwordRouter from '@modules/users/infra/http/routes/passwordRoutes';
import profileRouter from '@modules/users/infra/http/routes/profileRoutes';
import providersRouter from '@modules/appointments/infra/http/routes/providersRoute';
import sessionsRouter from '@modules/users/infra/http/routes/sessionsRoutes';
import usersRouter from '@modules/users/infra/http/routes/usersRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
