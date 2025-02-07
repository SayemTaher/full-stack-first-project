import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {

    if (!config.databaseURL) {
      throw new Error('DATABASE_URL is missing in the environment variables');
    }

    await mongoose.connect(config.databaseURL);

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
}
main();
