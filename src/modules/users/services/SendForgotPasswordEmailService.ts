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

    return this.mailProvider.send({
      to: email,
      body: `Pedido de recuperação de senha recebido: ${token}`
    });
  }
}

export default SendForgotPasswordEmailService;
