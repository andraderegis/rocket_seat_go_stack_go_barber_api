export default interface IStorageProvider {
  delete(file: string): Promise<void>;
  save(file: string): Promise<string>;
}
