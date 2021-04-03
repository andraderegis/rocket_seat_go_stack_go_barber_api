import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUpdateProfileDTO from '../dtos/IUpdateProfileDTO';
import IUserService from './interfaces/IUserService';

@injectable()
class UpdateProfileService implements IUserService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH)
    private hashProvider: IHashProvider
  ) {
    //
  }

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }: IUpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email informed already in use.');
    }

    Object.assign(user, {
      name,
      email
    });

    if (password && !old_password) {
      throw new AppError('It is necessary to inform the old password to set a new password.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
    }

    if (password) {
      Object.assign(user, {
        password: await this.hashProvider.generate(password)
      });
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
