import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

const APPOINTMENT_HOUR_INTERVAL_LIMIT = {
  START: 8,
  END: 17
};

@injectable()
class CreateAppointmentService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private appointmentRepository: IAppointmentsRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.NOTIFICATION)
    private notificationsRepository: INotificationRepository
  ) {
    //
  }

  public async execute({
    provider_id,
    user_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    await this.checkPastDate(appointmentDate);

    await this.checkEqualityBetweenProviderAndUser(user_id, provider_id);

    const appointmentHour = getHours(appointmentDate);

    await this.checkAllowedAppointmentHourInterval(
      appointmentHour,
      APPOINTMENT_HOUR_INTERVAL_LIMIT.START,
      APPOINTMENT_HOUR_INTERVAL_LIMIT.END
    );

    await this.checkAppointmentAlreadyBooked(appointmentDate, this.appointmentRepository);

    const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    });

    await this.sendNotification(this.notificationsRepository, appointmentDate, provider_id);

    return appointment;
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

  private async checkAllowedAppointmentHourInterval(
    appointmentHour: number,
    startHourIntervalLimit: number,
    endHourIntervalLimit: number
  ): Promise<void> {
    if (appointmentHour < startHourIntervalLimit || appointmentHour > endHourIntervalLimit) {
      throw new AppError('Appointment only should be created between 8h (8am) and 17h (5pm)');
    }
  }

  private async checkAppointmentAlreadyBooked(
    dateForAppointment: Date,
    repository: IAppointmentsRepository
  ): Promise<void> {
    const findAppointmentInSameDate = await repository.findByDate(dateForAppointment);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
  }

  private async sendNotification(
    repository: INotificationRepository,
    appointmentDate: Date,
    recipient_id: string
  ): Promise<void> {
    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    await repository.create({
      recipient_id,
      content: `Novo agendamento para dia ${dateFormatted}`
    });
  }
}

export default CreateAppointmentService;
