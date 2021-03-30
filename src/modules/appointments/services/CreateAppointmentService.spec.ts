import MockAppointmentsRepository from '@modules/appointments/repositories/mocks/MockAppointmentRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(mockAppointmentsRepository);

    const appointmentToCreate = {
      date: new Date(2021, 2, 30, 19),
      provider_id: '123123'
    };

    const appointment = await createAppointmentService.execute(appointmentToCreate);

    expect(appointment).toHaveProperty('id');
    expect(appointment).toEqual(expect.objectContaining(appointmentToCreate));
  });

  it('should not be able to create two appointments on the same datetime', async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(mockAppointmentsRepository);

    const appointmentDate = new Date(2021, 2, 30, 19);

    const appointmentToCreate = {
      date: appointmentDate,
      provider_id: '123123'
    };

    await createAppointmentService.execute(appointmentToCreate);

    expect(createAppointmentService.execute(appointmentToCreate)).rejects.toBeInstanceOf(AppError);
  });
});
