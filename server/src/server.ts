import app from './app';
import { config } from './config/env';
import { connectDB } from './config/db';
import { initRedis } from './redis/cacheService';

const startServer = async () => {
  await connectDB();
  await initRedis();

  app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(`  E-Commerce Engine Server active on port ${config.port}`);
    console.log(`  Environment: ${config.nodeEnv}`);
    console.log(`  API Base Path: http://localhost:${config.port}/api/v1`);
    console.log(`====================================================`);
  });
};

startServer();
