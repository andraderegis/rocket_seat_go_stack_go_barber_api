interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER || 'Ethereal',
  defaults: {
    from: {
      email: 'gobarber@example.com.br',
      name: 'Go Barber'
    }
  }
} as IMailConfig;
