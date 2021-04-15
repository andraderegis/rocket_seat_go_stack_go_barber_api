import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';

class MockCacheProvider implements ICacheProvider {
  private cache = new Map();

  public async invalidatePrefix(prefix: string): Promise<void> {
    this.cache.forEach((value: string, key: string) => {
      if (key.startsWith(`${prefix}:`)) {
        this.cache.delete(key);
      }
    });
  }

  public async invalidate(key: string): Promise<void> {
    this.cache.delete(key);
  }

  public async get<T>(key: string): Promise<T> {
    const data = this.cache.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(this.cache.get(key)) as T;
  }

  public async save(key: string, value: unknown): Promise<void> {
    this.cache.set(key, JSON.stringify(value));
  }
}

export default MockCacheProvider;
