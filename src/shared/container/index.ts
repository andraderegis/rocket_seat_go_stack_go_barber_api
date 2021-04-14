import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import '@shared/providers/mail-template/container';
import '@shared/providers/mail/container';
import '@shared/providers/storage/container';
import '@shared/providers/file-source-storage/container';
import '@shared/providers/cache-provider/container';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/hash/implementations/BCryptHashProvider';

/*
 - registerSingleton: only create a instance when it is required for usage
 - registerInstance: create a instance even it is not required for usage
*/

container.registerSingleton<IAppointmentsRepository>(
  CONTAINER_NAME_DEPENDENCIES.REPOSITORY.APPOINTMENT,
  AppointmentsRepository
);

container.registerSingleton<INotificationRepository>(
  CONTAINER_NAME_DEPENDENCIES.REPOSITORY.NOTIFICATION,
  NotificationRepository
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
