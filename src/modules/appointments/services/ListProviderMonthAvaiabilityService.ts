import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderMonthAvaiabilityDTO from '@modules/appointments/dtos/IListProviderMonthAvaiabilityDTO';
import IListProviderMonthAvaiabilityResponseDTO from '@modules/appointments/dtos/IListProviderMonthAvaiabilityResponseDTO';
import IListProviderMonthAvaiabilityService from '@modules/appointments/services/interfaces/IListProviderMonthAvaiabilityService';

const APPOINTMENT_LIMIT_IN_DAY = 10;

@injectable()
class ListProviderMonthAvaiabilityService implements IListProviderMonthAvaiabilityService {
  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT)
    private appointmentsRespository: IAppointmentsRepository
  ) {
    //
  }

  public async execute({
    provider_id,
    month,
    year
  }: IListProviderMonthAvaiabilityDTO): Promise<IListProviderMonthAvaiabilityResponseDTO> {
    const appointments = await this.appointmentsRespository.findAllInMonth({
      provider_id,
      year,
      month
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1);

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < APPOINTMENT_LIMIT_IN_DAY
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvaiabilityService;
