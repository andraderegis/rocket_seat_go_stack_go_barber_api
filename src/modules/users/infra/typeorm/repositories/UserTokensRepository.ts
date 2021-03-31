import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  public async findByToken(token: string): Promise<UserToken> {
    throw new Error('Method not implemented.');
  }

  public async generate(user_id: string): Promise<UserToken> {
    throw new Error('Method not implemented.');
  }
}

export default UserTokensRepository;
