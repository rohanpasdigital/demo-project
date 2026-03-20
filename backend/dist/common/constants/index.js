"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = void 0;
exports.CONSTANTS = {
    PASSWORD_MIN_LENGTH: 6,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 50,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    HTTP_TIMEOUT: 30000,
    MAX_REQUEST_SIZE: '10mb',
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
    CACHE_TTL: 3600,
    CACHE_KEY_PREFIX: 'app:',
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
    SUCCESS_MESSAGES: {
        LOGIN_SUCCESS: 'Login successful',
        REGISTER_SUCCESS: 'User registered successfully',
        LOGOUT_SUCCESS: 'Logout successful',
        PASSWORD_CHANGED: 'Password changed successfully',
    },
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'],
    MAX_MESSAGE_LENGTH: 1000,
    MAX_MESSAGES_PER_MINUTE: 10,
    MESSAGE_BATCH_SIZE: 50,
};
exports.default = exports.CONSTANTS;
//# sourceMappingURL=index.js.map