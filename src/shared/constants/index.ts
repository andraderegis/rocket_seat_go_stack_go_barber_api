export const CONTAINER_NAME_DEPENDENCIES = {
  REPOSITORY: {
    APPOINTMENT: 'AppointmentsRepository',
    USERS: 'UsersRepository',
    USER_TOKENS: 'UserTokensRepository'
  },
  PROVIDER: {
    HASH: 'HashProvider',
    MAIL: 'MailProvider',
    MAIL_TEMPLATE: 'MailTemplateProvider',
    STORAGE: {
      DISK: 'DiskStorageProvider'
    },
    TOKEN: {
      USER: 'UserTokensRepository'
    }
  }
};

export const ERRORS = {
  MESSAGES: {
    PROVIDERS: {
      ETHEREAL_MAIL: {
        CANNOT_INITIALIZE: 'Cannot initialize EtherealMailProvider'
      }
    }
  }
};

export const MAIL = {
  DATA_CONTENT: {
    FROM: {
      DEFAULT_NAME: 'Equipe GoBarber',
      DEFAULT_ADDRESS: 'equipe@gobarber.com.br'
    }
  }
};
