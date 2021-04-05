import IService from '@shared/interfaces/IService';

import { IListProviderMonthAvaiabilityResponseDTO } from '@modules/appointments/dtos/IListProviderMonthAvaiabilityResponseDTO';

import IListProviderMonthAvaiabilityDTO from '@modules/appointments/dtos/IListProviderMonthAvaiabilityDTO';

export default interface IListProviderMonthAvaiabilityService
  extends IService<IListProviderMonthAvaiabilityResponseDTO> {
  execute({
    user_id,
    month,
    year
  }: IListProviderMonthAvaiabilityDTO): Promise<IListProviderMonthAvaiabilityResponseDTO>;
}
