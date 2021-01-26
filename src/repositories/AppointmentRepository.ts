import { EntityRepository, Repository } from 'typeorm';

import Appointement from '../models/Appointment';

@EntityRepository(Appointement)
class AppointmentRepository extends Repository<Appointement> {
  public async findByDate(date: Date): Promise<Appointement | null> {
    const findAppointment = await this.findOne({
      where: { date }
    });

    return findAppointment || null;
  }
}

export default AppointmentRepository;
