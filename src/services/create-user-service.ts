import { getRepository } from 'typeorm';

import User from '../models/user';

interface CreateUserServiceDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserServiceDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email }
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password
    });

    return usersRepository.save(user);
  }
}

export default CreateUserService;
