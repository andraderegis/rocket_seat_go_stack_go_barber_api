import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IResetPasswordServiceDTO from '@modules/users/dtos/IResetPasswordServiceDTO';

@injectable()
class ResetPasswordService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.TOKEN.USER)
    private userTokensRepository: IUserTokensRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH)
    private hashProvider: IHashProvider
  ) {
    //
  }

  async execute({ password, token }: IResetPasswordServiceDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exits.');
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt.getTime()) > 2) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generate(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
