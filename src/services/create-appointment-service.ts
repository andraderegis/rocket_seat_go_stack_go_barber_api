import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointement from '../models/appointment';
import AppointmentRepository from '../repositories/appointment-repository';

interface CreateAppointmentServiceDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = getCustomRepository(AppointmentRepository);
  }

  public async execute({ provider, date }: CreateAppointmentServiceDTO): Promise<Appointement> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate
    });

    return this.appointmentRepository.save(appointment);
  }
}

export default CreateAppointmentService;
