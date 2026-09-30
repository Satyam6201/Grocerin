import Redis from 'ioredis';

let redisClient = null;
let isRedisAvailable = false;

const memoryCache = new Map();

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

try {
    redisClient = new Redis(redisUrl, {
        lazyConnect: true,
        connectTimeout: 2000,
        maxRetriesPerRequest: 1,
        retryStrategy(times) {
            if (times > 3) {
                return null;
            }
            return Math.min(times * 100, 1000);
        }
    });

    redisClient.on('connect', () => {
        isRedisAvailable = true;
        console.log('Redis Connected Successfully');
    });

    redisClient.on('error', (err) => {
        isRedisAvailable = false;
    });

    redisClient.connect().catch(() => {
        isRedisAvailable = false;
        console.log('ℹ️  Redis server not detected. Gracefully falling back to High-Speed In-Memory Cache.');
    });
} catch (error) {
    isRedisAvailable = false;
    console.log('ℹ️  Redis initialization skipped, using In-Memory Cache fallback.');
}

export const getCache = async (key) => {
    try {
        if (isRedisAvailable && redisClient) {
            const data = await redisClient.get(key);
            return data ? JSON.parse(data) : null;
        }
    } catch (err) {
    }

    const memItem = memoryCache.get(key);
    if (memItem) {
        if (Date.now() > memItem.expiry) {
            memoryCache.delete(key);
            return null;
        }
        return memItem.data;
    }
    return null;
};

export const setCache = async (key, value, ttlSeconds = 300) => {
    try {
        if (isRedisAvailable && redisClient) {
            await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
            return;
        }
    } catch (err) {
    }

    memoryCache.set(key, {
        data: value,
        expiry: Date.now() + ttlSeconds * 1000
    });
};

export const delCache = async (keyPattern) => {
    try {
        if (isRedisAvailable && redisClient) {
            if (keyPattern.includes('*')) {
                const keys = await redisClient.keys(keyPattern);
                if (keys.length > 0) {
                    await redisClient.del(...keys);
                }
            } else {
                await redisClient.del(keyPattern);
            }
        }
    } catch (err) {
    }

    if (keyPattern.includes('*')) {
        const regex = new RegExp(`^${keyPattern.replace('*', '.*')}$`);
        for (const k of memoryCache.keys()) {
            if (regex.test(k)) {
                memoryCache.delete(k);
            }
        }
    } else {
        memoryCache.delete(keyPattern);
    }
};

export const getRedisStatus = () => ({
    connected: isRedisAvailable,
    mode: isRedisAvailable ? 'Redis Distributed' : 'In-Memory High-Speed Fallback',
    memoryKeysCount: memoryCache.size
});

export default redisClient;
