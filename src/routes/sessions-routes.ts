import { Router } from 'express';

import AuthenticateUserService from '../services/authenticate-user-service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password
  });

  return response.status(201).json({ user, token });
});

export default sessionsRouter;
