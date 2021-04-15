import 'reflect-metadata';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRespository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';
import MockCacheProvider from '@shared/providers/cache/mocks/MockCacheProvider';

let mockUsersRepository: IUsersRepository;
let mockCacheProvider: ICacheProvider;

let listProvidersService: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockCacheProvider = new MockCacheProvider();

    listProvidersService = new ListProvidersService(mockUsersRepository, mockCacheProvider);
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

    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: user1.name, email: user1.email }),
        expect.objectContaining({ name: user2.name, email: user2.email })
      ])
    );
  });

  it('should be able to list the providers 2', async () => {
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

    jest.spyOn(mockCacheProvider, 'get').mockImplementationOnce(() => Promise.resolve(undefined));

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    });

    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: user1.name, email: user1.email }),
        expect.objectContaining({ name: user2.name, email: user2.email })
      ])
    );
  });
});
