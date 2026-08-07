import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let upstashClient: Redis | null = null;
let isRedisConnected = false;

// Fallback in-memory cache if Redis is offline
const inMemoryCache = new Map<string, { value: string; expiresAt: number }>();

export const initRedis = async (): Promise<void> => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.log('[Redis] UPSTASH_REDIS_REST_URL or TOKEN not set. Falling back to in-memory cache.');
    return;
  }

  try {
    upstashClient = new Redis({ url, token });

    // Ping to verify the connection
    const pong = await Promise.race([
      upstashClient.ping(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Redis connection timed out')), 5000)
      ),
    ]);

    if (pong === 'PONG') {
      isRedisConnected = true;
      console.log('[Redis] Connected to Upstash successfully.');
    }
  } catch (error: any) {
    isRedisConnected = false;
    upstashClient = null;
    console.log('[Redis] Server unreachable. Falling back to high-performance in-memory cache.');
  }
};

export const cacheService = {
  get: async <T>(key: string): Promise<T | null> => {
    try {
      if (isRedisConnected && upstashClient) {
        const data = await upstashClient.get<string>(key);
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
      if (isRedisConnected && upstashClient) {
        await upstashClient.set(key, stringified, { ex: ttlSeconds });
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
      if (isRedisConnected && upstashClient) {
        if (keyPatternOrKey.includes('*')) {
          const keys = await upstashClient.keys(keyPatternOrKey);
          if (keys.length > 0) {
            await upstashClient.del(...keys);
          }
        } else {
          await upstashClient.del(keyPatternOrKey);
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
