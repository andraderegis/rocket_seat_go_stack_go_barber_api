import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IAuthenticateUserServiceDTO from '../dtos/IAuthenticateUserServiceDTO';
import IAuthenticateUserServiceResponseDTO from '../dtos/IAuthenticateUserServiceResponseDTO';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository
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

    const passwordMatched = await compare(password, user.password);

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
