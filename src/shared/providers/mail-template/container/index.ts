import { container } from 'tsyringe';
import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IMailTemplateProvider from '@shared/providers/mail-template/interfaces/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/providers/mail-template/implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider
};

container.registerSingleton<IMailTemplateProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.MAIL_TEMPLATE,
  providers.handlebars
);
