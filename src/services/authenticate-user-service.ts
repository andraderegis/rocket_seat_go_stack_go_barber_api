import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/user';

interface AuthenticateUserServiceDTO {
  email: string;
  password: string;
}

interface AuthenticateUserServiceResponse {
  user: User;
}

class AuthenticateUserService {
  public async execute({
    email,
    password
  }: AuthenticateUserServiceDTO): Promise<AuthenticateUserServiceResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    delete user.password;

    return {
      user
    };
  }
}

export default AuthenticateUserService;
