import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

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

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment => isEqual(appointment.date, date));
  }

  public async find(): Promise<Appointment[]> {
    throw new Error('Method not implemented.');
  }
}

export default MockAppointmentsRepository;
