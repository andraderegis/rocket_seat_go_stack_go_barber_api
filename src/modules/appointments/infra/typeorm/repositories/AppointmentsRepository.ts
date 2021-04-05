import { getRepository, Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    return this.ormRepository.save(appointment);
  }

  public async find(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  public async findAllInMonth({
    provider_id,
    month,
    year
  }: IFindAllInMonthDTO): Promise<Appointment[]> {
    const dateToInterval = new Date(year, month - 1);

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfMonth(dateToInterval), endOfMonth(dateToInterval))
      }
    });

    /** Optional implementation for postgresql usage case. The current implentation
     * is better because it's generic and works in all suported databases by TypeORM.

      const parsedMonth = String(month).padStart(2, '0');

      return this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(
            dateFiledName => `to_char(${dateFiledName}, 'MM-YYYY') = '${month}-${year}'`
          )
        }
      })
    */
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    });
    return findAppointment;
  }
}

export default AppointmentsRepository;
