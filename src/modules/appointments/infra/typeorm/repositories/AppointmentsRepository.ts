import { getRepository, Repository, Between } from 'typeorm';
import { startOfDay, startOfMonth, endOfDay, endOfMonth } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';

const TO_DECREMENT_FOR_JAVASCRIPT_DATE_FORMAT = 1;

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, user_id, date });

    return this.ormRepository.save(appointment);
  }

  public async find(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  public async findAllInDay({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayDTO): Promise<Appointment[]> {
    const date = new Date(year, month - TO_DECREMENT_FOR_JAVASCRIPT_DATE_FORMAT, day);

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfDay(date), endOfDay(date))
      }
    });

    /** Optional implementation for postgresql usage case. The current implentation
     * is better because it's generic and works in all suported databases by TypeORM.

      const parsedDay = String(day).padStart(2, '0');
      const parsedMonth = String(month).padStart(2, '0');

      return this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(
            dateFiledName => `to_char(${dateFiledName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
          )
        }
      })
    */
  }

  public async findAllInMonth({
    provider_id,
    month,
    year
  }: IFindAllInMonthDTO): Promise<Appointment[]> {
    const dateToInterval = new Date(year, month - TO_DECREMENT_FOR_JAVASCRIPT_DATE_FORMAT);

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
            dateFiledName => `to_char(${dateFiledName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
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
