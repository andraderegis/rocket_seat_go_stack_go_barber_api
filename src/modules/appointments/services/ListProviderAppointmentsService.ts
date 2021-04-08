import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import Appointement from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderAppointmentsService from '@modules/appointments/services/interfaces/IListProviderAppointmentsService';
import IListProviderAppointmentsDTO from '@modules/appointments/dtos/IListProviderAppointmentsDTO';

@injectable()
class ListProviderAppointmentsService implements IListProviderAppointmentsService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private appointmentsRespository: IAppointmentsRepository
  ) {
    //
  }

  execute({
    provider_id,
    day,
    month,
    year
  }: IListProviderAppointmentsDTO): Promise<Appointement[]> {
    return this.appointmentsRespository.findAllInDay({ provider_id, day, month, year });
  }
}

export default ListProviderAppointmentsService;
