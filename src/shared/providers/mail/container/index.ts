import { container } from 'tsyringe';
import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import EtherealProvider from '@shared/providers/mail/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/providers/mail/implementations/SESMailProvider';

import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';

import mailConfig from '@config/mail';

const providers = {
  ethereal: container.resolve(EtherealProvider),
  ses: container.resolve(SESMailProvider)
};

container.registerInstance<IMailProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.MAIL,
  providers[mailConfig.driver]
);
