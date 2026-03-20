/**
 * Environment Configuration
 * This file reads from environment variables and provides them to the application
 * Environment variables must be prefixed with VITE_ to be accessible in Vite
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  },
  socket: {
    url: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000',
  },
};

// Validation: Ensure critical env variables are set
if (!config.api.baseUrl) {
  console.warn('VITE_API_BASE_URL is not set. Using default.');
}

if (!config.socket.url) {
  console.warn('VITE_SOCKET_URL is not set. Using default.');
}

export default config;
