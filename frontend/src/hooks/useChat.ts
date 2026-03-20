import { useState, useEffect } from 'react';
import type { Message } from '../types';
import socketService from '../services/socketService';

export const useChat = (selectedRoom: string, userLoggedIn: boolean) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socketService.connect();

    socketService.onPreviousMessages((msgs: Message[]) => {
      setMessages(msgs);
    });

    socketService.onNewMessage((msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketService.onError((err: any) => {
      setError(err.message || 'An error occurred');
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    });

    return () => {
      socketService.offPreviousMessages();
      socketService.offNewMessage();
      socketService.offError();
    };
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      if (currentRoom && currentRoom !== selectedRoom) {
        socketService.leaveRoom(currentRoom);
        setMessages([]);
      }
      socketService.joinRoom(selectedRoom);
      setCurrentRoom(selectedRoom);
    }
  }, [selectedRoom, currentRoom]);

  const sendMessage = (content: string, senderName: string, token: string) => {
    if (!userLoggedIn) {
      alert('Login is required to send messages');
      return;
    }
    if (content.trim()) {
      socketService.sendMessage(selectedRoom, content, senderName, token);
    }
  };

  return { messages, setMessages, sendMessage, error };
};
