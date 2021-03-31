import IHashProvider from '@modules/users/providers/hash/interfaces/IHashProvider';

class MockHashProvider implements IHashProvider {
  public async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  public async generate(payload: string): Promise<string> {
    return payload;
  }
}

export default MockHashProvider;
