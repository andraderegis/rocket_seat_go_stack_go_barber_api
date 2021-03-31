import 'reflect-metadata';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import MockUserTokensRepository from '@modules/users/repositories/mocks/MockUserTokensRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

let mockUsersRepository: IUsersRepository;
let mockUserTokensRepository: IUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();

    resetPasswordService = new ResetPasswordService(mockUsersRepository, mockUserTokensRepository);
  });

  it('should be able to reset the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    });

    const userToken = await mockUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token: userToken.token
    });

    const updatedUser = await mockUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
