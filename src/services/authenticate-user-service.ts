import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

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

    const token = sign({}, '72818791bc3d90a1fd6ca19700082593', {
      subject: user.id,
      expiresIn: '10m'
    });

    delete user.password;

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;
