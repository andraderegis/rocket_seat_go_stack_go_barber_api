import 'reflect-metadata';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';

import ShowProfileService from '@modules/users/services/ShowProfileService';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

let mockUsersRepository: IUsersRepository;

let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();

    showProfileService = new ShowProfileService(mockUsersRepository);
  });
  it('should be able show profile', async () => {
    const user = await mockUsersRepository.create({
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    });

    await expect(showProfileService.execute({ user_id: user.id })).resolves.toEqual(
      expect.objectContaining({
        name: 'Aerith Gainsborough',
        email: 'theflowergirl@example.com'
      })
    );
  });

  it('should not be able show profile who does not exists', async () => {
    await expect(
      showProfileService.execute({ user_id: 'no-exists-user-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
