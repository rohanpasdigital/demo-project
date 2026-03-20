/**
 * Socket.IO hooks for managing real-time connections
 */

import { useEffect } from 'react';
import socketService from '../services/socketService';
import type { Message } from '../types';

export const useSocket = () => {
  useEffect(() => {
    socketService.connect();
    return () => {
      // Don't disconnect on unmount to keep connection alive
    };
  }, []);

  return socketService;
};

export const useSocketRoom = (room: string) => {
  const socket = useSocket();

  useEffect(() => {
    socket.joinRoom(room);
    return () => {
      socket.leaveRoom(room);
    };
  }, [room, socket]);

  return socket;
};

export const useSocketMessages = (
  onMessage: (msg: Message) => void,
  onPreviousMessages: (msgs: Message[]) => void
) => {
  const socket = useSocket();

  useEffect(() => {
    socket.onPreviousMessages(onPreviousMessages);
    socket.onNewMessage(onMessage);

    return () => {
      socket.offPreviousMessages();
      socket.offNewMessage();
    };
  }, [socket, onMessage, onPreviousMessages]);

  return socket;
};
