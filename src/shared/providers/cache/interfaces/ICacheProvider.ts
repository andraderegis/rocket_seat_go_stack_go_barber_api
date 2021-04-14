export default interface ICacheProvider {
  invalidate(key: string): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  save(key: string, value: any): Promise<void>;
}
