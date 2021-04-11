import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticatedMiddleware';

const profileController = new ProfileController();
const profileRoutes = Router();

profileRoutes.use(ensureAuthenticatedMiddleware);

profileRoutes.get('/', profileController.get);
profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.string().required()
      }),
      password_confirmation: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.string().required().valid(Joi.ref('password'))
      })
    }
  }),
  profileController.update
);

export default profileRoutes;
