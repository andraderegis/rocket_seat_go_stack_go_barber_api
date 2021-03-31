import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import MockHashProvider from '@modules/users/providers/hash/mocks/MockHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const mockHashProvider = new MockHashProvider();
    const mockUsersRepository = new MockUsersRepository();

    const createUserService = new CreateUserService(mockUsersRepository, mockHashProvider);

    const userToCreate = {
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    };

    const user = await createUserService.execute(userToCreate);

    expect(user).toHaveProperty('id');
    expect(user).toEqual(
      expect.objectContaining({
        name: 'Cloud Strife',
        email: 'cloudstrife@example.com'
      })
    );
  });
  it('should not be able to create a new user with email already in usage for another user', async () => {
    const mockHashProvider = new MockHashProvider();
    const mockUsersRepository = new MockUsersRepository();

    const createUserService = new CreateUserService(mockUsersRepository, mockHashProvider);

    const userToCreate = {
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    };

    await createUserService.execute(userToCreate);

    await expect(createUserService.execute(userToCreate)).rejects.toBeInstanceOf(AppError);
  });
});
