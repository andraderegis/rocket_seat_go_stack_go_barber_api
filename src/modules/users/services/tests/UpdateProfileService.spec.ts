import 'reflect-metadata';
import { v4 as uuid } from 'uuid';

import MockHashProvider from '@modules/users/providers/hash/mocks/MockHashProvider';
import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let mockHashProvider: IHashProvider;
let mockUsersRepository: IUsersRepository;

let updateProfileService: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    mockHashProvider = new MockHashProvider();

    mockUsersRepository = new MockUsersRepository();

    updateProfileService = new UpdateProfileService(mockUsersRepository, mockHashProvider);
  });
  it('should be able to update user profile', async () => {
    const userToCreate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    const user = await mockUsersRepository.create(userToCreate);

    const userToUpdate = {
      user_id: user.id,
      name: 'Aerith Strife',
      email: 'aerithflowergirl@example.com'
    };

    const userUpdated = await updateProfileService.execute(userToUpdate);

    expect(userUpdated).toEqual(
      expect.objectContaining({
        name: 'Aerith Strife',
        email: 'aerithflowergirl@example.com'
      })
    );
  });

  it('should not be able to update user profile who does not exists', async () => {
    const userToUpdate = {
      user_id: uuid(),
      name: 'Aerith Strife',
      email: 'aerithflowergirl@example.com'
    };

    expect(updateProfileService.execute(userToUpdate)).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to change the email to already usage email', async () => {
    await mockUsersRepository.create({
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    });

    const user = await mockUsersRepository.create({
      name: 'Tifa Lockheart',
      email: 'tifa7thheaven@example.com',
      password: '123456'
    });

    const userToUpdate = {
      user_id: user.id,
      name: 'Tifa Lockheart',
      email: 'theflowergirl@example.com'
    };

    await expect(updateProfileService.execute(userToUpdate)).rejects.toBeInstanceOf(AppError);
  });
  it('should be able update user password', async () => {
    const userToCreate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    const user = await mockUsersRepository.create(userToCreate);

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123123',
      old_password: '123456'
    });

    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able update user password without old password', async () => {
    const userToCreate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    const user = await mockUsersRepository.create(userToCreate);

    const userToUpdate = {
      user_id: user.id,
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123123'
    };

    await expect(updateProfileService.execute(userToUpdate)).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able update user password with wrong old password', async () => {
    const userToCreate = {
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    };

    const user = await mockUsersRepository.create(userToCreate);

    const userToUpdate = {
      user_id: user.id,
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123123',
      old_password: 'wrong-old-password'
    };

    await expect(updateProfileService.execute(userToUpdate)).rejects.toBeInstanceOf(AppError);
  });
});
