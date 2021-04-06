import { inject, injectable } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IListProviderDayAvailabilityDTO from '@modules/appointments/dtos/IListProviderDayAvailabilityDTO';
import IListProviderDayAvailabilityResponseDTO from '@modules/appointments/dtos/IListProviderDayAvailabilityResponseDTO';
import IListProviderDayAvailabilityService from '@modules/appointments/services/interfaces/IListProviderDayAvailabilityService';
import { getHours, isAfter } from 'date-fns';

const APPOINTMENT_LIMITS = {
  START_HOUR: 8,
  QUANTITY_PER_DAY: 10
};

const TO_DECREMENT_VALUE_FOR_JAVASCRIPT_DATE_FORMAT = 1;

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
    day,
    month,
    year
  }: IListProviderDayAvailabilityDTO): Promise<IListProviderDayAvailabilityResponseDTO> {
    const appointments = await this.appointmentsRespository.findAllInDay({
      provider_id,
      day,
      month,
      year
    });

    const eachHours = Array.from(
      { length: APPOINTMENT_LIMITS.QUANTITY_PER_DAY },
      (_, index) => index + APPOINTMENT_LIMITS.START_HOUR
    );

    const availability = eachHours.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

      const currentDate = new Date(Date.now());
      const appointmentToDoDate = new Date(
        year,
        month - TO_DECREMENT_VALUE_FOR_JAVASCRIPT_DATE_FORMAT,
        day,
        hour
      );

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(appointmentToDoDate, currentDate)
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
