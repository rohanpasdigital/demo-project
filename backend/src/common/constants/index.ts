/**
 * Application-wide constants
 */

export const CONSTANTS = {
  // Validation
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // HTTP
  HTTP_TIMEOUT: 30000,
  MAX_REQUEST_SIZE: '10mb',

  // Pagination
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,

  // Cache
  CACHE_TTL: 3600, // 1 hour in seconds
  CACHE_KEY_PREFIX: 'app:',

  // Socket.IO
  SOCKET_EVENTS: {
    JOIN_ROOM: 'joinRoom',
    LEAVE_ROOM: 'leaveRoom',
    SEND_MESSAGE: 'sendMessage',
    RECEIVE_MESSAGE: 'receiveMessage',
    TYPING: 'typing',
    STOP_TYPING: 'stopTyping',
    ONLINE_USERS: 'onlineUsers',
    USER_JOINED: 'userJoined',
    USER_LEFT: 'userLeft',
    PREVIOUS_MESSAGES: 'previousMessages',
  },

  // Error Messages
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'Invalid username or password',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: 'User already exists',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden resource',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
    TOKEN_EXPIRED: 'Token has expired',
    INVALID_TOKEN: 'Invalid token',
  },

  // Success Messages
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: 'Login successful',
    REGISTER_SUCCESS: 'User registered successfully',
    LOGOUT_SUCCESS: 'Logout successful',
    PASSWORD_CHANGED: 'Password changed successfully',
  },

  // Languages
  SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'],

  // Room limits
  MAX_MESSAGE_LENGTH: 1000,
  MAX_MESSAGES_PER_MINUTE: 10,
  MESSAGE_BATCH_SIZE: 50,
};

export default CONSTANTS;
