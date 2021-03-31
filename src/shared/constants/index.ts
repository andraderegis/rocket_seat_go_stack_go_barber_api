// eslint-disable-next-line import/prefer-default-export
export const CONTAINER_NAME_DEPENDENCIES = {
  REPOSITORY: {
    APPOINTMENT: 'AppointmentsRepository',
    USERS: 'UsersRepository',
    USER_TOKENS: 'UserTokensRepository'
  },
  PROVIDER: {
    HASH: 'HashProvider',
    MAIL: 'MailProvider',
    STORAGE: {
      DISK: 'DiskStorageProvider'
    },
    TOKEN: {
      USER: 'UserTokensRepository'
    }
  }
};
