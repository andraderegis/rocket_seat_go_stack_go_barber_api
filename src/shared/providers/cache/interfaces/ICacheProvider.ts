export default interface ICacheProvider {
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  save(key: string, value: unknown): Promise<void>;
}
