import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';

class MockBCryptHashProvider implements IHashProvider {
  public async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  public async generated(payload: string): Promise<string> {
    return payload;
  }
}

export default MockBCryptHashProvider;
