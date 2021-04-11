import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';
import DiskStorageProvider from '@shared/providers/storage/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider
};

container.registerSingleton<IStorageProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.STORAGE.DISK,
  providers.disk
);
