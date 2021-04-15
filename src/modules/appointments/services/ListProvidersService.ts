import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CACHE, CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IListProviderDTO from '@modules/users/dtos/IShowProfileDTO';
import IListProviderService from '@modules/appointments/services/interfaces/IListProviderService';
import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';

@injectable()
class ListProfileService implements IListProviderService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.CACHE)
    private cacheProvider: ICacheProvider
  ) {
    //
  }

  public async execute({ user_id }: IListProviderDTO): Promise<User[]> {
    let users = await this.cacheProvider.get<User[]>(
      `${CACHE.PREFIX_KEY.PROVIDERS.LIST}:${user_id}`
    );

    console.log({ users });

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      });

      users = users.map(user => {
        return classToClass(user);
      });

      await this.cacheProvider.save(`${CACHE.PREFIX_KEY.PROVIDERS.LIST}:${user_id}`, users);
    }

    return users;
  }
}

export default ListProfileService;
