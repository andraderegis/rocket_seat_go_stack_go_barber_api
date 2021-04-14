import IFileSourceStorageProvider from '@shared/providers/storage/interfaces/IFileSourceStorageProvider';

class DiskFileSourceStorageProvider implements IFileSourceStorageProvider {
  public url(filename?: string): string {
    const sourceFile = `${process.env.APP_API_URL}/files`;

    return filename ? `${sourceFile}/${filename}` : sourceFile;
  }
}

export default DiskFileSourceStorageProvider;
