export declare const CONSTANTS: {
    PASSWORD_MIN_LENGTH: number;
    USERNAME_MIN_LENGTH: number;
    USERNAME_MAX_LENGTH: number;
    EMAIL_REGEX: RegExp;
    HTTP_TIMEOUT: number;
    MAX_REQUEST_SIZE: string;
    DEFAULT_PAGE: number;
    DEFAULT_LIMIT: number;
    MAX_LIMIT: number;
    CACHE_TTL: number;
    CACHE_KEY_PREFIX: string;
    SOCKET_EVENTS: {
        JOIN_ROOM: string;
        LEAVE_ROOM: string;
        SEND_MESSAGE: string;
        RECEIVE_MESSAGE: string;
        TYPING: string;
        STOP_TYPING: string;
        ONLINE_USERS: string;
        USER_JOINED: string;
        USER_LEFT: string;
        PREVIOUS_MESSAGES: string;
    };
    ERROR_MESSAGES: {
        INVALID_CREDENTIALS: string;
        USER_NOT_FOUND: string;
        USER_ALREADY_EXISTS: string;
        UNAUTHORIZED: string;
        FORBIDDEN: string;
        INTERNAL_SERVER_ERROR: string;
        VALIDATION_ERROR: string;
        TOKEN_EXPIRED: string;
        INVALID_TOKEN: string;
    };
    SUCCESS_MESSAGES: {
        LOGIN_SUCCESS: string;
        REGISTER_SUCCESS: string;
        LOGOUT_SUCCESS: string;
        PASSWORD_CHANGED: string;
    };
    SUPPORTED_LANGUAGES: string[];
    MAX_MESSAGE_LENGTH: number;
    MAX_MESSAGES_PER_MINUTE: number;
    MESSAGE_BATCH_SIZE: number;
};
export default CONSTANTS;
