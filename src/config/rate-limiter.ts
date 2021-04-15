import { IRateLimiterOptions } from 'rate-limiter-flexible';

export default {
  keyPrefix: process.env.RATE_LIMITER_KEY_PREFIX || 'ratelimit',
  points: process.env.RATE_LIMITER_POINTS ? parseFloat(process.env.RATE_LIMITER_POINTS) : 5,
  duration: process.env.RATE_LIMITER_DURATION ? parseFloat(process.env.RATE_LIMITER_DURATION) : 1
} as IRateLimiterOptions;
