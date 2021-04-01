import IMailTemplateProvider from '@shared/providers/mail-template/interfaces/IMailTemplateProvider';

class MockMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default MockMailTemplateProvider;
