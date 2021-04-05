import 'reflect-metadata';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

let mockUsersRepository: IUsersRepository;

let listProvidersService: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();

    listProvidersService = new ListProvidersService(mockUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await mockUsersRepository.create({
      name: 'Aerith Gainsborough',
      email: 'theflowergirl@example.com',
      password: '123456'
    });

    const user2 = await mockUsersRepository.create({
      name: 'Cloud Strife',
      email: 'cloudstrife@example.com',
      password: '123456'
    });

    const loggedUser = await mockUsersRepository.create({
      name: 'Tifa Lockheart',
      email: 'tifalockheart@example.com',
      password: '123456'
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    });

    expect(providers).toEqual([user1, user2]);
  });
});
