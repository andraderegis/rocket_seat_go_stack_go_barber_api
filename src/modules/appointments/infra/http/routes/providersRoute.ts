import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticatedMiddleware';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticatedMiddleware);

providersRouter.get('/', providersController.index);

export default providersRouter;
