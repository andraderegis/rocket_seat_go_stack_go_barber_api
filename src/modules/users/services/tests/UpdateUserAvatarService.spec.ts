import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import MockStorageProvider from '@shared/providers/storage/mocks/MockStorageProvider';
import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

let mockStorageProvider: IStorageProvider;
let mockUsersRepository: IUsersRepository;

let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    mockStorageProvider = new MockStorageProvider();

    mockUsersRepository = new MockUsersRepository();

    updateUserAvatarService = new UpdateUserAvatarService(mockUsersRepository, mockStorageProvider);
  });
  it('should be able to update avatar', async () => {
    const userToCreate = {
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    };

    const user = await mockUsersRepository.create(userToCreate);

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    /**
     * Verify if MockStorageProvider delete funcion was triggered
     */
    const deleteMockStorageProvider = jest.spyOn(mockStorageProvider, 'delete');

    const userToCreate = {
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    };

    const user = await mockUsersRepository.create(userToCreate);

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });

    /**
     * MockStorageProvider delete funcion should be called with old avatar passed as parameter
     */
    expect(deleteMockStorageProvider).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
