import 'reflect-metadata';

import MockAppointmentsRepository from '@modules/appointments/repositories/mocks/MockAppointmentsRepository';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import RedisCacheProvider from '@shared/providers/cache/implementations/RedisCacheProvider';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderAppointmentsService from '@modules/appointments/services/interfaces/IListProviderAppointmentsService';
import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';

let mockAppointmentsRepository: IAppointmentsRepository;
let mockCacheProvider: ICacheProvider;
let listProvidersDayAvailabilityService: IListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    mockCacheProvider = new RedisCacheProvider();

    listProvidersDayAvailabilityService = new ListProviderAppointmentsService(
      mockAppointmentsRepository,
      mockCacheProvider
    );
  });
  it('should be able to list provider appointments on a specific day', async () => {
    const appointment1 = await mockAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2021, 3, 6, 14, 0, 0),
      provider_id: 'user'
    });

    const appointment2 = await mockAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2021, 3, 6, 15, 0, 0),
      provider_id: 'user'
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 3, 6, 11).getTime();
    });

    const appointments = await listProvidersDayAvailabilityService.execute({
      provider_id: 'user',
      day: 6,
      month: 4,
      year: 2021
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
