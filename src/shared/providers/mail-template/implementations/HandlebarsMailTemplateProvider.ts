import handlebars from 'handlebars';

import IMailTemplateProvider from '@shared/providers/mail-template/interfaces/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/providers/mail-template/dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
