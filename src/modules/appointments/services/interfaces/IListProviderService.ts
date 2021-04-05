import User from '@modules/users/infra/typeorm/entities/User';

import IListProviderDTO from '@modules/appointments/dtos/IListProviderDTO';
import IService from '@shared/interfaces/IService';

export default interface IListProviderService extends IService<User[]> {
  execute({ user_id }: IListProviderDTO): Promise<User[]>;
}
