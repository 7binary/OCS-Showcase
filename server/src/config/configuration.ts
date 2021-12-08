import { join } from 'path';

export const getConfiguration = () => ({
  server: {
    url: process.env.SERVER_URL,
    origin: process.env.SERVER_ORIGIN,
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  },
  database: {
    path: join(__dirname, process.env.DATABASE_FILENAME),
  }
});
