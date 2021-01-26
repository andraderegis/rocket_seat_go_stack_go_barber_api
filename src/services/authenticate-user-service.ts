import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/user';

interface AuthenticateUserServiceDTO {
  email: string;
  password: string;
}

interface AuthenticateUserServiceResponse {
  user: User;
  token: string;
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

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id }, secret, {
      subject: user.id,
      expiresIn
    });

    delete user.password;

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;
