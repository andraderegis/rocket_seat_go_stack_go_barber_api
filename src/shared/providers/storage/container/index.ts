import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import storageConfig from '@config/storage';

import DiskStorageProvider from '@shared/providers/storage/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storage/implementations/S3StorageProvider';
import S3FileSourceStorageProvider from '@shared/providers/storage/implementations/S3FileSourceStorageProvider';
import DiskFileSourceStorageProvider from '@shared/providers/storage/implementations/DiskFileSourceStorageProvider';

import IFileSourceStorageProvider from '@shared/providers/storage/interfaces/IFileSourceStorageProvider';
import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';

const providers = {
  storage: {
    disk: DiskStorageProvider,
    s3: S3StorageProvider
  },
  fileSource: {
    disk: DiskFileSourceStorageProvider,
    s3: S3FileSourceStorageProvider
  }
};

container.registerSingleton<IStorageProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.STORAGE.DISK,
  providers.storage[storageConfig.driver]
);

container.registerSingleton<IFileSourceStorageProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.FILE_SOURCE_STORAGE,
  providers.fileSource[storageConfig.driver]
);
