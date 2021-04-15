import MockAppointmentsRepository from '@modules/appointments/repositories/mocks/MockAppointmentsRepository';
import MockNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/mocks/MockNotificationsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';
import MockCacheProvider from '@shared/providers/cache/mocks/MockCacheProvider';

let mockAppointmentsRepository: IAppointmentsRepository;
let mockNotificationRepository: INotificationRepository;
let mockCacheProvider: ICacheProvider;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    mockNotificationRepository = new MockNotificationsRepository();
    mockCacheProvider = new MockCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      mockAppointmentsRepository,
      mockNotificationRepository,
      mockCacheProvider
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 30, 16).getTime();
    });

    const appointmentToCreate = {
      user_id: 'user-id',
      date: new Date(2021, 2, 30, 17),
      provider_id: 'provider-id'
    };

    const appointment = await createAppointmentService.execute(appointmentToCreate);

    expect(appointment).toHaveProperty('id');
    expect(appointment).toEqual(expect.objectContaining(appointmentToCreate));
  });

  it('should not be able to create two appointments on the same datetime', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 30, 16).getTime();
    });

    const appointmentDate = new Date(2021, 2, 30, 17);

    const appointmentToCreate = {
      user_id: 'user-id',
      date: appointmentDate,
      provider_id: 'provider-id'
    };

    await mockAppointmentsRepository.create(appointmentToCreate);

    await expect(createAppointmentService.execute(appointmentToCreate)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 6, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user-id',
        date: new Date(2021, 3, 6, 11),
        provider_id: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 6, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user-id',
        date: new Date(2021, 3, 6, 13),
        provider_id: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8 hour (8am)', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 5, 13).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user-id',
        date: new Date(2021, 3, 6, 7),
        provider_id: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after 17 hour (5pm)', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 6, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: 'user-id',
        date: new Date(2021, 3, 6, 18),
        provider_id: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
