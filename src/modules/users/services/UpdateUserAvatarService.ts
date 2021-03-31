import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';
import IUpdateUserAvatarServiceDTO from '@modules/users/dtos/IUpdateUserAvatarServiceDTO';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.STORAGE.DISK)
    private storageProvider: IStorageProvider
  ) {
    //
  }

  public async execute({ user_id, avatarFileName }: IUpdateUserAvatarServiceDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    user.avatar = avatarFileName;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
