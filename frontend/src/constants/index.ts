const LANGUAGES = ['Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Malayalam', 'English', 'Nepali'];

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  MESSAGES: {
    GET_BY_ROOM: '/messages/:room',
    DELETE: '/messages/:id',
  },
  USERS: {
    GET_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },
};

const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
  SEND_MESSAGE: 'sendMessage',
  RECEIVE_MESSAGE: 'message',
  PREVIOUS_MESSAGES: 'previousMessages',
  ERROR: 'error',
};

export { LANGUAGES, API_ENDPOINTS, SOCKET_EVENTS };
