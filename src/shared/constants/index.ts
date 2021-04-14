export const CACHE = {
  PREFIX_KEY: {
    PROVIDERS: {
      LIST: 'providers-list:'
    }
  }
};

export const CONTAINER_NAME_DEPENDENCIES = {
  CONTROLLER: {
    USER: {
      PROFILE: 'ProfileController'
    }
  },
  PROVIDER: {
    CACHE: 'CacheProvider',
    FILE_SOURCE_STORAGE: 'FileSourceStorage',
    HASH: 'HashProvider',
    MAIL: 'MailProvider',
    MAIL_TEMPLATE: 'MailTemplateProvider',
    STORAGE: 'StorageProvider',
    TOKEN: {
      USER: 'UserTokensRepository'
    }
  },
  REPOSITORY: {
    APPOINTMENT: 'AppointmentsRepository',
    NOTIFICATION: 'NotificationRepository',
    USERS: 'UsersRepository',
    USER_TOKENS: 'UserTokensRepository'
  },
  SERVICE: {
    USER: {
      SHOW_PROFILE: 'ShowProfileService',
      UPDATE_PROFILE: 'UpdateProfileService'
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
  },
  DRIVER: {
    ETHEREAL: 'ethereal',
    SES: 'ses'
  }
};
