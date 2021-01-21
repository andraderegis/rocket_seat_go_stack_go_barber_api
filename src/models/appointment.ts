import { v4 as uuid } from 'uuid';

class Appointement {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointement, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointement;
