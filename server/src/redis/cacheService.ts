import { createClient } from 'redis';
import { config } from '../config/env';

let redisClient: ReturnType<typeof createClient> | null = null;
let isRedisConnected = false;

// Fallback in-memory cache if Redis is offline
const inMemoryCache = new Map<string, { value: string; expiresAt: number }>();

export const initRedis = async (): Promise<void> => {
  try {
    redisClient = createClient({ url: config.redisUrl });

    redisClient.on('error', (err) => {
      if (isRedisConnected) {
        console.warn(`[Redis Error]: ${err.message}`);
      }
      isRedisConnected = false;
    });

    redisClient.on('connect', () => {
      isRedisConnected = true;
      console.log('[Redis] Connected successfully.');
    });

    // Timeout after 3 seconds — if Redis isn't running, skip it gracefully
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Redis connection timed out')), 3000)
    );

    await Promise.race([redisClient.connect(), timeout]);
  } catch (error) {
    isRedisConnected = false;
    if (redisClient) {
      redisClient.quit().catch(() => {});
    }
    console.log('[Redis] Server unreachable. Falling back to high-performance in-memory cache.');
  }
};

export const cacheService = {
  get: async <T>(key: string): Promise<T | null> => {
    try {
      if (isRedisConnected && redisClient) {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
      }
    } catch (e) {
      // Fallback
    }

    const item = inMemoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      inMemoryCache.delete(key);
      return null;
    }
    return JSON.parse(item.value);
  },

  set: async (key: string, value: any, ttlSeconds: number = 300): Promise<void> => {
    const stringified = JSON.stringify(value);
    try {
      if (isRedisConnected && redisClient) {
        await redisClient.set(key, stringified, { EX: ttlSeconds });
        return;
      }
    } catch (e) {
      // Fallback
    }

    inMemoryCache.set(key, {
      value: stringified,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  },

  del: async (keyPatternOrKey: string): Promise<void> => {
    try {
      if (isRedisConnected && redisClient) {
        if (keyPatternOrKey.includes('*')) {
          const keys = await redisClient.keys(keyPatternOrKey);
          if (keys.length > 0) {
            await redisClient.del(keys);
          }
        } else {
          await redisClient.del(keyPatternOrKey);
        }
      }
    } catch (e) {
      // Fallback
    }

    // Clear matching keys in memory cache
    const isPattern = keyPatternOrKey.includes('*');
    const regex = isPattern ? new RegExp('^' + keyPatternOrKey.replace('*', '.*') + '$') : null;

    for (const key of inMemoryCache.keys()) {
      if (isPattern ? regex?.test(key) : key === keyPatternOrKey) {
        inMemoryCache.delete(key);
      }
    }
  },

  invalidateProductCache: async (productId?: string, categoryName?: string): Promise<void> => {
    await cacheService.del('products:all*');
    await cacheService.del('featured');
    await cacheService.del('search:*');
    if (productId) {
      await cacheService.del(`product:${productId}`);
    }
    if (categoryName) {
      await cacheService.del(`category:${categoryName}*`);
    }
    console.log(`[Cache Invalidation] Flushed catalog cache for product: ${productId || 'all'}`);
  },
};
