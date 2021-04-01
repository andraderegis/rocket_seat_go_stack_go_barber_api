import ISendEmailDTO from '@shared/providers/mail/dtos/ISendEmailDTO';

export default interface IMailProvider {
  send(data: ISendEmailDTO): Promise<void>;
}
