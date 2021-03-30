import 'reflect-metadata';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import MockHashProvider from '@modules/users/providers/hash/mocks/MockHashProvider';

describe('AuthenticateUser', () => {
  it('should be able authenticate user', async () => {
    const mockHashProvider = new MockHashProvider();
    const mockUsersRepository = new MockUsersRepository();

    const createUserService = new CreateUserService(mockUsersRepository, mockHashProvider);
    const authenticateUserService = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider
    );

    const userToCreate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    const userToAuthenticate = {
      email: userToCreate.email,
      password: userToCreate.password
    };

    const user = await createUserService.execute(userToCreate);

    const authenticateResponse = await authenticateUserService.execute(userToAuthenticate);

    expect(authenticateResponse).toHaveProperty('token');
    expect(authenticateResponse.user).toEqual(user);
  });
});
