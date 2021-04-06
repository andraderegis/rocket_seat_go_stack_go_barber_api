import IService from '@shared/interfaces/IService';

import IListProviderMonthAvailabilityResponseDTO from '@modules/appointments/dtos/IListProviderMonthAvailabilityResponseDTO';

import IListProviderMonthAvailabilityDTO from '@modules/appointments/dtos/IListProviderMonthAvailabilityDTO';

export default interface IListProviderMonthAvailabilityService
  extends IService<IListProviderMonthAvailabilityResponseDTO> {
  execute({
    provider_id,
    month,
    year
  }: IListProviderMonthAvailabilityDTO): Promise<IListProviderMonthAvailabilityResponseDTO>;
}
