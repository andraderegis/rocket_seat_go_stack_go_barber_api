import { v4 as uuid } from 'uuid';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class MockUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find(userToken => userToken.token === token);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = Object.assign(new UserToken(), {
      id: uuid(),
      token: uuid(),
      user_id
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default MockUserTokensRepository;
