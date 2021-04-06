import { v4 as uuid } from 'uuid';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';

const TO_INCREMENT_FOR_JAVASCRIPT_DATE_FORMAT = 1;

class MockAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = Object.assign(new Appointment(), {
      id: uuid(),
      date,
      provider_id
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInDay({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayDTO): Promise<Appointment[]> {
    return this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + TO_INCREMENT_FOR_JAVASCRIPT_DATE_FORMAT === month &&
        getYear(appointment.date) === year
    );
  }

  public async findAllInMonth({
    provider_id,
    month,
    year
  }: IFindAllInMonthDTO): Promise<Appointment[]> {
    return this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + TO_INCREMENT_FOR_JAVASCRIPT_DATE_FORMAT === month &&
        getYear(appointment.date) === year
    );
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment => isEqual(appointment.date, date));
  }

  public async find(): Promise<Appointment[]> {
    throw new Error('Method not implemented.');
  }
}

export default MockAppointmentsRepository;
