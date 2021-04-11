import path from 'path';

import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import ISendForgotPasswordEmailServiceDTO from '@modules/users/dtos/ISendForgotPasswordEmailServiceDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.MAIL)
    private mailProvider: IMailProvider,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.TOKEN.USER)
    private userTokensRepository: IUserTokensRepository
  ) {
    //
  }

  async execute({ email }: ISendForgotPasswordEmailServiceDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    return this.mailProvider.send({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }
}

export default SendForgotPasswordEmailService;
