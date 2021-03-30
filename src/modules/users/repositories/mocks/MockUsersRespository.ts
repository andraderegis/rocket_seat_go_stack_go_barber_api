import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';

class MockUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUsersDTO): Promise<User> {
    const user = Object.assign(new User(), {
      id: uuid(),
      ...data
    });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(findUser => findUser.id === user.id);

    if (index) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }

    return user;
  }
}

export default MockUsersRepository;
