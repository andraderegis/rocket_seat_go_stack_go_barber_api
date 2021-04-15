import { inject, injectable } from 'tsyringe';

import { CACHE, CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderAppointmentsService from '@modules/appointments/services/interfaces/IListProviderAppointmentsService';
import IListProviderAppointmentsDTO from '@modules/appointments/dtos/IListProviderAppointmentsDTO';
import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';

@injectable()
class ListProviderAppointmentsService implements IListProviderAppointmentsService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private appointmentsRespository: IAppointmentsRepository,

    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.CACHE)
    private cacheProvider: ICacheProvider
  ) {
    //
  }

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IListProviderAppointmentsDTO): Promise<Appointment[]> {
    const cacheKey = `${CACHE.PREFIX_KEY.PROVIDERS.APPOINTMENTS}:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.get<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRespository.findAllInDay({
        provider_id,
        day,
        month,
        year
      });

      await this.cacheProvider.save(cacheKey, appointments);
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
