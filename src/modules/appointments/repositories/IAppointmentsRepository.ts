import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  find(): Promise<Appointment[]>;
  findAllInMonth(data: IFindAllInMonthDTO): Promise<Appointment[]>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
