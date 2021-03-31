import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';
import ISendEmailDTO from '@shared/providers/mail/dtos/ISendEmailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISendEmailDTO[] = [];

  public async send({ to, body }: ISendEmailDTO): Promise<void> {
    this.messages.push({
      to,
      body
    });
  }
}

export default FakeMailProvider;
