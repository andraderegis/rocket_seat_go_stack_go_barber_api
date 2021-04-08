import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IListProviderAppointmentsDTO from '@modules/appointments/dtos/IListProviderAppointmentsDTO';

export default interface IListProviderAppointmentsService {
  execute({ provider_id, day, month, year }: IListProviderAppointmentsDTO): Promise<Appointment[]>;
}
