import IListProviderDayAvailabilityDTO from '@modules/appointments/dtos/IListProviderDayAvailabilityDTO';
import IListProviderDayAvailabilityResponseDTO from '@modules/appointments/dtos/IListProviderDayAvailabilityResponseDTO';

export default interface IListProviderDayAvailabilityService {
  execute({
    provider_id,
    day,
    month,
    year
  }: IListProviderDayAvailabilityDTO): Promise<IListProviderDayAvailabilityResponseDTO>;
}
