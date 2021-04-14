import ICacheProvider from '@shared/providers/cache/interfaces/ICacheProvider';

class MockCacheProvider implements ICacheProvider {
  invalidate(key: string): Promise<void> {
    return Promise.resolve();
  }

  get<T>(key: string): Promise<T> {
    const data = {} as T;
    return Promise.resolve(data);
  }

  save(key: string, value: any): Promise<void> {
    return Promise.resolve();
  }
}

export default MockCacheProvider;
