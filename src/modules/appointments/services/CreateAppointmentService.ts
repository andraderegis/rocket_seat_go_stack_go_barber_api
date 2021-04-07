import { getHours, isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import AppError from '@shared/errors/AppError';

import Appointement from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

const APPOINTMENT_HOUR_INTERVAL_LIMIT = {
  START: 8,
  END: 17
};

@injectable()
class CreateAppointmentService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private appointmentRepository: IAppointmentsRepository
  ) {
    //
  }

  public async execute({
    provider_id,
    user_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointement> {
    const appointmentDate = startOfHour(date);

    await this.checkPastDate(appointmentDate);

    await this.checkEqualityBetweenProviderAndUser(user_id, provider_id);

    const appointmentHour = getHours(appointmentDate);

    if (
      appointmentHour < APPOINTMENT_HOUR_INTERVAL_LIMIT.START ||
      appointmentHour > APPOINTMENT_HOUR_INTERVAL_LIMIT.END
    ) {
      throw new AppError('Appointment only should be created between 8h (8am) and 17h (5pm)');
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    return this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    });
  }

  private async checkPastDate(dateForAppointment: Date): Promise<void> {
    if (isBefore(dateForAppointment, Date.now())) {
      throw new AppError('Cannot create an appointment on a past date');
    }
  }

  private async checkEqualityBetweenProviderAndUser(
    user_id: string,
    provider_id: string
  ): Promise<void> {
    if (user_id === provider_id) {
      throw new AppError('Cannot create appointment with provider_id and user_id as same value');
    }
  }
}

export default CreateAppointmentService;
