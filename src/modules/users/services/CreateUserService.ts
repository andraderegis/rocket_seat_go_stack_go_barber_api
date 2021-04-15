import { inject, injectable } from 'tsyringe';

import { CACHE, CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';
import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH)
    private hashProvider: IHashProvider,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.CACHE)
    private cacheProvider: ICacheProvider
  ) {
    //
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await this.cacheProvider.invalidatePrefix(CACHE.PREFIX_KEY.PROVIDERS.LIST);

    return user;
  }
}

export default CreateUserService;
