import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private usersRepository: IUsersRepository
  ) {
    //
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });
  }
}

export default CreateUserService;
