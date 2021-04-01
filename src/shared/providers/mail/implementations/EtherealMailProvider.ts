import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import { CONTAINER_NAME_DEPENDENCIES, ERRORS, MAIL } from '@shared/constants';

import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';
import ISendEmailDTO from '@shared/providers/mail/dtos/ISendEmailDTO';
import AppError from '@shared/errors/AppError';
import IMailTemplateProvider from '@shared/providers/mail-template/interfaces/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.MAIL_TEMPLATE)
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.init()
      .then()
      .catch(e => {
        throw new AppError(
          `${ERRORS.MESSAGES.PROVIDERS.ETHEREAL_MAIL.CANNOT_INITIALIZE}. Error: ${e.message}`,
          500
        );
      });
  }

  public async send({ from, to, subject, templateData }: ISendEmailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || MAIL.DATA_CONTENT.FROM.DEFAULT_NAME,
        address: from?.email || MAIL.DATA_CONTENT.FROM.DEFAULT_ADDRESS
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });

    console.info(`Message sent: ${message.messageId}`);
    console.info(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }

  private async init(): Promise<void> {
    if (this.client) {
      return;
    }

    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    this.client = transporter;
  }
}

export default EtherealMailProvider;
