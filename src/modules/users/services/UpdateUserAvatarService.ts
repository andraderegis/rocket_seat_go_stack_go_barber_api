import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import path from 'path';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserAvatarServiceDTO from '../dtos/IUpdateUserAvatarServiceDTO';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository
  ) {
    //
  }

  public async execute({ user_id, avatarFileName }: IUpdateUserAvatarServiceDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
