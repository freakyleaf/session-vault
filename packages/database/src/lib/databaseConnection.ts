import mongoose from 'mongoose';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    console.log('\x1b[34mi\x1b[0m MongoDB is already connected');
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    const mongoConnection = await mongoose.connect(mongoUri);

    isConnected = true;
    console.log(
      `\x1b[32m✓\x1b[0m Connected to MongoDB: \x1b[33m${mongoConnection.connection.host}\x1b[0m`,
    );
  } catch (error) {
    console.error(
      '\x1b[31m✗\x1b[0m MongoDB connection error: \x1b[31m',
      error,
      '\x1b[0m',
    );
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('\x1b[32m✓\x1b[0m MongoDB disconnected');
  } catch (error) {
    console.error(
      '\x1b[31m✗\x1b[0m MongoDB disconnection error: \x1b[31m',
      error,
      '\x1b[0m',
    );
  }
};
