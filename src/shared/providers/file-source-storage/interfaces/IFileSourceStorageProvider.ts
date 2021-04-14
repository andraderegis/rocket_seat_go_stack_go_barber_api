export default interface IFileSourceStorageProvider {
  url(filename?: string): string;
}
