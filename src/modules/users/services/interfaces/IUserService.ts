import User from '@modules/users/infra/typeorm/entities/User';

import IService from '@shared/interfaces/IService';

export default interface IUserService extends IService<User> {
  execute(params: unknown): Promise<User>;
}
