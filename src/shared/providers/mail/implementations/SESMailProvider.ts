import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import mailConfig from '@config/mail';

import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';
import IMailTemplateProvider from '@shared/providers/mail-template/interfaces/IMailTemplateProvider';
import ISendEmailDTO from '@shared/providers/mail/dtos/ISendEmailDTO';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject(CONTAINER_NAME_DEPENDENCIES.PROVIDER.MAIL_TEMPLATE)
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGION
      })
    });
  }

  public async send({ from, to, subject, templateData }: ISendEmailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;

    this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
  }
}

export default SESMailProvider;
