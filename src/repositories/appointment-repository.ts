import { isEqual } from 'date-fns';

import Appointement from '../models/appointment';

class AppointmentRepository {
  private appointments: Appointement[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointement[] {
    return this.appointments;
  }

  public create(provider: string, date: Date): Appointement {
    const appointment = new Appointement(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointement | null {
    const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

    return findAppointment || null;
  }
}

export default AppointmentRepository;
