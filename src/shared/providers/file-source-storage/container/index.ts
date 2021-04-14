import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import storageConfig from '@config/storage';

import DiskFileSourceStorageProvider from '@shared/providers/file-source-storage/implementations/DiskFileSourceStorageProvider';
import S3FileSourceStorageProvider from '@shared/providers/file-source-storage/implementations/S3FileSourceStorageProvider';

import IFileSourceStorageProvider from '@shared/providers/file-source-storage/interfaces/IFileSourceStorageProvider';

const providers = {
  disk: DiskFileSourceStorageProvider,
  s3: S3FileSourceStorageProvider
};

container.registerSingleton<IFileSourceStorageProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.FILE_SOURCE_STORAGE,
  providers[storageConfig.driver]
);
