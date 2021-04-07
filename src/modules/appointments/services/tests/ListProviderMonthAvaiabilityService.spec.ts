import 'reflect-metadata';

import MockAppointmentsRepository from '@modules/appointments/repositories/mocks/MockAppointmentsRepository';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvaiabilityService';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderMonthAvailabilityService from '@modules/appointments/services/interfaces/IListProviderMonthAvailabilityService';

let mockAppointmentsRepository: IAppointmentsRepository;
let listProvidersMonthAvailabilityService: IListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProvidersMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      mockAppointmentsRepository
    );
  });
  it('should be able to list the month availabitiy from provider between 8 at 18 hours', async () => {
    /** appointment beyond of desire month */
    await mockAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2021, 4, 6, 11, 0, 0),
      provider_id: 'user'
    });

    const createAppointments = [];

    for (let hour = 8; hour <= 18; hour += 1) {
      createAppointments.push(
        mockAppointmentsRepository.create({
          user_id: 'user-id',
          date: new Date(2021, 3, 5, hour, 0, 0),
          provider_id: 'user'
        })
      );
    }

    await Promise.all(createAppointments);

    const Availability = await listProvidersMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2021,
      month: 4
    });

    expect(Availability).toEqual(
      expect.arrayContaining([
        { day: 4, available: true },
        { day: 5, available: false },
        { day: 6, available: true },
        { day: 7, available: true }
      ])
    );
  });
});
