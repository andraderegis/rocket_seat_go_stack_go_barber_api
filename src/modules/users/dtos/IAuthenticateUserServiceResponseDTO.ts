import User from '@modules/users/infra/typeorm/entities/User';

export default interface IAuthenticateUserServiceResponseDTO {
  user: User;
  token: string;
}
