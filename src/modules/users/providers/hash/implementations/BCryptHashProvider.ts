import { hash, compare } from 'bcryptjs';
import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public async generated(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}

export default BCryptHashProvider;
