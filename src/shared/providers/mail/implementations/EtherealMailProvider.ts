import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';
import ISendEmailDTO from '@shared/providers/mail/dtos/ISendEmailDTO';
import AppError from '@shared/errors/AppError';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.init()
      .then()
      .catch(e => {
        throw new AppError(`Cannot initialize EtherealMailProvider. Error: ${e.message}`, 500);
      });
  }

  public async send({ to, body }: ISendEmailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body
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
