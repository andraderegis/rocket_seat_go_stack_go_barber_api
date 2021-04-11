import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import IService from '@shared/interfaces/IService';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IShowProfileDTO from '@modules/users/dtos/IShowProfileDTO';

@injectable()
class ShowProfileService implements IService<User> {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository
  ) {
    //
  }

  public async execute({ user_id }: IShowProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
