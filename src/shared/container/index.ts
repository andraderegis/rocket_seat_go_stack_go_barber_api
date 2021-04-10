import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

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

import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';
import EtherealMailProvider from '@shared/providers/mail/implementations/EtherealMailProvider';

import IMailTemplateProvider from '@shared/providers/mail-template/interfaces/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/providers/mail-template/implementations/HandlebarsMailTemplateProvider';

import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';
import DiskStorageProvider from '@shared/providers/storage/implementations/DiskStorageProvider';

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

container.registerSingleton<IMailTemplateProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.MAIL_TEMPLATE,
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.MAIL,
  container.resolve(EtherealMailProvider)
);

container.registerSingleton<IHashProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.HASH,
  BCryptHashProvider
);
container.registerSingleton<IStorageProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.STORAGE.DISK,
  DiskStorageProvider
);
