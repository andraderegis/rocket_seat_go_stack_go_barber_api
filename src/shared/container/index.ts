import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/hash/implementations/BCryptHashProvider';

import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';
import DiskStorageProvider from '@shared/providers/storage/implementations/DiskStorageProvider';

container.registerSingleton<IAppointmentsRepository>(
  CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT,
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS,
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USER_TOKENS,
  UserTokensRepository
);

container.registerSingleton<IHashProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH,
  BCryptHashProvider
);
container.registerSingleton<IStorageProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.STORAGE.DISK,
  DiskStorageProvider
);
