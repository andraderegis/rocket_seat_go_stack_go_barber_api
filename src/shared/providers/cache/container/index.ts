import { container } from 'tsyringe';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/providers/cache-provider/interfaces/ICacheProvider';

import RedisCacheProvider from '@shared/providers/cache-provider/implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider
};

container.registerSingleton<ICacheProvider>(
  CONTAINER_NAME_DEPENDENCIES.PROVIDER.CACHE,
  providers[cacheConfig.driver]
);
