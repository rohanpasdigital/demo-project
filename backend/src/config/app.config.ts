/**
 * Application configuration
 * Manages app-wide settings like PORT, NODE_ENV, etc.
 */

export const getAppConfig = () => {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    environment: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    corsOrigin: process.env.CORS_ORIGIN || '*',
  };
};

export const APP_CONFIG = getAppConfig();
