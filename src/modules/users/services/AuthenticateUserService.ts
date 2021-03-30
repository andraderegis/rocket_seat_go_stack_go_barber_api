import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import IAuthenticateUserServiceDTO from '@modules/users/dtos/IAuthenticateUserServiceDTO';
import IAuthenticateUserServiceResponseDTO from '@modules/users/dtos/IAuthenticateUserServiceResponseDTO';
import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH)
    private hashProvider: IHashProvider
  ) {
    //
  }

  public async execute({
    email,
    password
  }: IAuthenticateUserServiceDTO): Promise<IAuthenticateUserServiceResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    delete user.password;

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;
