import IMailTemplateProvider from '@shared/providers/mail-template/interfaces/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/providers/mail-template/dtos/IParseMailTemplateDTO';

class MockMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default MockMailTemplateProvider;
