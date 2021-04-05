import User from '@modules/users/infra/typeorm/entities/User';

import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IListProviderDTO from '@modules/users/dtos/IShowProfileDTO';
import IListProviderService from '@modules/appointments/services/interfaces/IListProviderService';

@injectable()
class ListProfileService implements IListProviderService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository
  ) {
    //
  }

  public async execute({ user_id }: IListProviderDTO): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    });

    return users.map(user => {
      const userWithoutPassword = user;

      delete userWithoutPassword.password;

      return userWithoutPassword;
    });
  }
}

export default ListProfileService;
