import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderMonthAvailabilityDTO from '@modules/appointments/dtos/IListProviderMonthAvailabilityDTO';
import IListProviderMonthAvailabilityResponseDTO from '@modules/appointments/dtos/IListProviderMonthAvailabilityResponseDTO';
import IListProviderDayAvailabilityService from '@modules/appointments/services/interfaces/IListProviderDayAvailabilityService';

const APPOINTMENT_LIMIT_IN_DAY = 10;

@injectable()
class ListProviderDayAvailabilityService implements IListProviderDayAvailabilityService {
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
  }: IListProviderMonthAvailabilityDTO): Promise<IListProviderMonthAvailabilityResponseDTO> {
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

export default ListProviderDayAvailabilityService;
