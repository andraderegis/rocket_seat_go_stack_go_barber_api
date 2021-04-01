import IMailProvider from '@shared/providers/mail/interfaces/IMailProvider';
import ISendEmailDTO from '@shared/providers/mail/dtos/ISendEmailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISendEmailDTO[] = [];

  public async send(message: ISendEmailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
