import 'reflect-metadata';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import MockHashProvider from '@modules/users/providers/hash/mocks/MockHashProvider';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able authenticate user', async () => {
    const mockHashProvider = new MockHashProvider();
    const mockUsersRepository = new MockUsersRepository();

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

    const user = await mockUsersRepository.create(userToCreate);

    const authenticateResponse = await authenticateUserService.execute(userToAuthenticate);

    expect(authenticateResponse).toHaveProperty('token');
    expect(authenticateResponse.user).toEqual(user);
  });
  it('should not be able authenticate with non existing user', async () => {
    const mockHashProvider = new MockHashProvider();
    const mockUsersRepository = new MockUsersRepository();

    const authenticateUserService = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider
    );

    const userToAuthenticate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    expect(authenticateUserService.execute(userToAuthenticate)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate user with wrong password', async () => {
    const mockHashProvider = new MockHashProvider();
    const mockUsersRepository = new MockUsersRepository();

    const authenticateUserService = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider
    );

    const userToCreate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    await mockUsersRepository.create(userToCreate);

    const userToAuthenticate = {
      email: userToCreate.email,
      password: '12345'
    };

    expect(authenticateUserService.execute(userToAuthenticate)).rejects.toBeInstanceOf(AppError);
  });
});
