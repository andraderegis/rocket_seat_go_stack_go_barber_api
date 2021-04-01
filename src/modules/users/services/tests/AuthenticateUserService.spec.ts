import 'reflect-metadata';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import MockHashProvider from '@modules/users/providers/hash/mocks/MockHashProvider';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

let mockHashProvider: IHashProvider;
let mockUsersRepository: IUsersRepository;

let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    mockHashProvider = new MockHashProvider();
    mockUsersRepository = new MockUsersRepository();

    authenticateUserService = new AuthenticateUserService(mockUsersRepository, mockHashProvider);
  });

  it('should be able authenticate user', async () => {
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
    const userToAuthenticate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    await expect(authenticateUserService.execute(userToAuthenticate)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should not be able authenticate user with wrong password', async () => {
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

    await expect(authenticateUserService.execute(userToAuthenticate)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
