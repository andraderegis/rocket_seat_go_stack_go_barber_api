import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private usersRepository: IUsersRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH)
    private hashProvider: IHashProvider
  ) {
    //
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });
  }
}

export default CreateUserService;
