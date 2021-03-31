import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

import MockMailProvider from '@shared/providers/mail/mocks/MockMailProvider';
import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';
import MockUserTokensRepository from '@modules/users/repositories/mocks/MockUserTokensRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';

let mockMailProvider: IMailProvider;
let mockUsersRepository: IUsersRepository;
let mockUserTokensRepository: IUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    mockMailProvider = new MockMailProvider();
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockMailProvider,
      mockUserTokensRepository
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMockMailProvider = jest.spyOn(mockMailProvider, 'send');

    const userToCreate = {
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    };

    await mockUsersRepository.create(userToCreate);

    const emailToSend = {
      email: userToCreate.email
    };

    await sendForgotPasswordEmailService.execute(emailToSend);

    expect(sendMockMailProvider).toHaveBeenCalled();
  });

  it('shoud be not able to recover a non-existing user password', async () => {
    const emailToSend = {
      email: 'cloudstrife@example.com'
    };

    await expect(sendForgotPasswordEmailService.execute(emailToSend)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should generate a forgot password token ', async () => {
    const generateMockUserTokenRepository = jest.spyOn(mockUserTokensRepository, 'generate');

    const userToCreate = {
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    };

    const user = await mockUsersRepository.create(userToCreate);

    const emailToSend = {
      email: userToCreate.email
    };

    await sendForgotPasswordEmailService.execute(emailToSend);

    expect(generateMockUserTokenRepository).toHaveBeenCalledWith(user.id);
  });
});
