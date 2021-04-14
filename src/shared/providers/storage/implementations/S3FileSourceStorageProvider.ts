import IFileSourceStorageProvider from '@shared/providers/storage/interfaces/IFileSourceStorageProvider';

class S3FileSourceStorageProvider implements IFileSourceStorageProvider {
  public url(filename?: string): string {
    const sourceUrl = `https://${process.env.AWS_S3_GO_BARBER_BUCKET}.s3.amazonaws.com`;

    return filename ? `${sourceUrl}/${filename}` : sourceUrl;
  }
}

export default S3FileSourceStorageProvider;
