import 'reflect-metadata';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import MockUserTokensRepository from '@modules/users/repositories/mocks/MockUserTokensRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import MockHashProvider from '@modules/users/providers/hash/mocks/MockHashProvider';
import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import AppError from '@shared/errors/AppError';

let mockHashProvider: IHashProvider;
let mockUsersRepository: IUsersRepository;
let mockUserTokensRepository: IUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    mockHashProvider = new MockHashProvider();
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      mockUsersRepository,
      mockUserTokensRepository,
      mockHashProvider
    );
  });

  it('should be able to reset the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    });

    const userToken = await mockUserTokensRepository.generate(user.id);

    const generateMockHashProvider = jest.spyOn(mockHashProvider, 'generate');

    await resetPasswordService.execute({
      password: '123123',
      token: userToken.token
    });

    const updatedUser = await mockUsersRepository.findById(user.id);

    expect(generateMockHashProvider).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'no-existing-token',
        password: '123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await mockUserTokensRepository.generate('non-existing-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: '123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset the password if passed than 2 hours', async () => {
    const user = await mockUsersRepository.create({
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    });

    const { token } = await mockUserTokensRepository.generate(user.id);

    /** with mockImplementationOnce we can override some function when it called once time */
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
