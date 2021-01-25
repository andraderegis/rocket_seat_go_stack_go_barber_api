import { Router } from 'express';

import AuthenticateUserService from '../services/authenticate-user-service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user } = await authenticateUserService.execute({
      email,
      password
    });

    return response.status(201).json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
