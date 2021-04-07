import 'reflect-metadata';

import MockAppointmentsRepository from '@modules/appointments/repositories/mocks/MockAppointmentsRepository';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderDayAvailabilityService from '@modules/appointments/services/interfaces/IListProviderDayAvailabilityService';

let mockAppointmentsRepository: IAppointmentsRepository;
let listProvidersDayAvailabilityService: IListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProvidersDayAvailabilityService = new ListProviderDayAvailabilityService(
      mockAppointmentsRepository
    );
  });
  it('should be able to list the hours availabitiy in day from provider', async () => {
    await mockAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2021, 3, 6, 14, 0, 0),
      provider_id: 'user'
    });

    await mockAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2021, 3, 6, 15, 0, 0),
      provider_id: 'user'
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 3, 6, 11).getTime();
    });

    const availability = await listProvidersDayAvailabilityService.execute({
      provider_id: 'user',
      day: 6,
      month: 4,
      year: 2021
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true }
      ])
    );
  });
});
