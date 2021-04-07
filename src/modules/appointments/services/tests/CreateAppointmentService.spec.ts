import MockAppointmentsRepository from '@modules/appointments/repositories/mocks/MockAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

let mockAppointmentsRepository: IAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(mockAppointmentsRepository);
  });
  it('should be able to create a new appointment', async () => {
    const appointmentToCreate = {
      user_id: 'user-id',
      date: new Date(2021, 2, 30, 19),
      provider_id: '123123'
    };

    const appointment = await createAppointmentService.execute(appointmentToCreate);

    expect(appointment).toHaveProperty('id');
    expect(appointment).toEqual(expect.objectContaining(appointmentToCreate));
  });

  it('should not be able to create two appointments on the same datetime', async () => {
    const appointmentDate = new Date(2021, 2, 30, 19);

    const appointmentToCreate = {
      user_id: 'user-id',
      date: appointmentDate,
      provider_id: '123123'
    };

    await createAppointmentService.execute(appointmentToCreate);

    expect(createAppointmentService.execute(appointmentToCreate)).rejects.toBeInstanceOf(AppError);
  });
});
