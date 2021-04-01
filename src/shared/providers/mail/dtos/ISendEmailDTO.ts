import IParseMailTemplateDTO from '@shared/providers/mail-template/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}
export default interface ISendEmailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
// export default interface ISendEmailDTO {
//   to: string;
//   body: string;
// }
