import 'reflect-metadata';

import MockAppointmentsRepository from '@modules/appointments/repositories/mocks/MockAppointmentsRepository';

import ListProviderMonthAvaiabilityService from '@modules/appointments/services/ListProviderMonthAvaiabilityService';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderMonthAvaiabilityService from '../interfaces/IListProviderMonthAvaiabilityService';

let mockAppointmentsRepository: IAppointmentsRepository;
let listProvidersMonthAvaiabilityService: IListProviderMonthAvaiabilityService;

describe('ListProviderMonthAvaiability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProvidersMonthAvaiabilityService = new ListProviderMonthAvaiabilityService(
      mockAppointmentsRepository
    );
  });
  it('should be able to list the month availabitiy from provider between 8 at 18 hours', async () => {
    /** appointment beyond of desire month */
    await mockAppointmentsRepository.create({
      date: new Date(2021, 4, 6, 11, 0, 0),
      provider_id: 'user'
    });

    const createAppointments = [];

    for (let hour = 8; hour <= 18; hour += 1) {
      createAppointments.push(
        mockAppointmentsRepository.create({
          date: new Date(2021, 3, 5, hour, 0, 0),
          provider_id: 'user'
        })
      );
    }

    await Promise.all(createAppointments);

    const avaiability = await listProvidersMonthAvaiabilityService.execute({
      provider_id: 'user',
      year: 2021,
      month: 4
    });

    expect(avaiability).toEqual(
      expect.arrayContaining([
        { day: 4, available: true },
        { day: 5, available: false },
        { day: 6, available: true },
        { day: 7, available: true }
      ])
    );
  });
});
