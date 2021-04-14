import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION
    });
  }

  public async delete(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: process.env.AWS_S3_GO_BARBER_BUCKET,
        Key: file
      })
      .promise();
  }

  public async save(file: string): Promise<string> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    const contentType = mime.getType(filePath);

    if (!contentType) {
      throw new AppError('File not found');
    }

    const fileContent = await fs.promises.readFile(filePath);

    await this.client
      .putObject({
        Bucket: process.env.AWS_S3_GO_BARBER_BUCKET,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
        ContentDisposition: `inline; filename=${file}`
      })
      .promise();

    await fs.promises.unlink(path.resolve(uploadConfig.tmpFolder, file));

    return file;
  }
}

export default S3StorageProvider;
