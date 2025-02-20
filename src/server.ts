import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

import { Server } from 'http'

let server: Server;

async function main() {
  try {

    if (!config.databaseURL) {
      throw new Error('DATABASE_URL is missing in the environment variables');
    }

    await mongoose.connect(config.databaseURL);

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
}
main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  process.exit(1);
});