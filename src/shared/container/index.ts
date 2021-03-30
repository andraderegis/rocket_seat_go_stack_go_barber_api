import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/hash/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH,
  BCryptHashProvider
);

container.registerSingleton<IAppointmentsRepository>(
  CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT,
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  CONTAINER_NAME_DEPENDENCIES.REPOSITORY.USERS,
  UsersRepository
);
