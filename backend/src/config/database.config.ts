/**
 * Database configuration
 * Manages MongoDB connection settings
 */

export const getDatabaseConfig = () => {
  const mongoUri =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app';

  return {
    uri: mongoUri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
};

export const DATABASE_CONFIG = getDatabaseConfig();
