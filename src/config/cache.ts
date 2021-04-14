import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis?: RedisOptions;
  };
}

export default {
  driver: process.env.CACHE_DRIVER || 'redis',
  config: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined
  }
} as ICacheConfig;
