import { getRepository, Repository } from 'typeorm';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken> {
    return this.ormRepository.findOne({
      where: {
        token
      }
    });
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id
    });

    return this.ormRepository.save(userToken);
  }
}

export default UserTokensRepository;
