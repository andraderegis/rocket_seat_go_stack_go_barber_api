import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import AppError from '@shared/errors/AppError';

import Appointement from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private appointmentRepository: IAppointmentsRepository
  ) {
    // eslint-disable-next-line prettier/prettier
  }

  public async execute({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointement> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    return this.appointmentRepository.create({
      provider_id,
      date: appointmentDate
    });
  }
}

export default CreateAppointmentService;
