import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticatedMiddleware';

const profileController = new ProfileController();
const profileRoutes = Router();

profileRoutes.use(ensureAuthenticatedMiddleware);

profileRoutes.get('/', profileController.get);
profileRoutes.put('/', profileController.update);

export default profileRoutes;
