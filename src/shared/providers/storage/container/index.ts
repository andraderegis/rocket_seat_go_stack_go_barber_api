import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import storageConfig from '@config/storage';

import DiskStorageProvider from '@shared/providers/storage/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storage/implementations/S3StorageProvider';

import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
};

console.log({ storageConfig });

container.registerSingleton<IStorageProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.STORAGE,
  providers[storageConfig.driver]
);
