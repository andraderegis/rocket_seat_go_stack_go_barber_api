import ISendEmailDTO from '@shared/providers/mail/dtos/ISendEmailDTO';

export default interface IMailProvider {
  send({ to, body }: ISendEmailDTO): Promise<void>;
}
