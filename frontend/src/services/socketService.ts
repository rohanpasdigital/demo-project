import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type { Message } from '../types';
import config from '../config/environment';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(config.socket.url);
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  joinRoom(room: string) {
    if (this.socket) {
      this.socket.emit('joinRoom', room);
    }
  }

  leaveRoom(room: string) {
    if (this.socket) {
      this.socket.emit('leaveRoom', room);
    }
  }

  sendMessage(room: string, content: string, sender: string, token: string) {
    if (this.socket) {
      this.socket.emit('sendMessage', { room, content, sender, token });
    }
  }

  onPreviousMessages(callback: (messages: Message[]) => void) {
    if (this.socket) {
      this.socket.on('previousMessages', callback);
    }
  }

  onNewMessage(callback: (message: Message) => void) {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  offPreviousMessages() {
    if (this.socket) {
      this.socket.off('previousMessages');
    }
  }

  offNewMessage() {
    if (this.socket) {
      this.socket.off('message');
    }
  }

  onError(callback: (error: any) => void) {
    if (this.socket) {
      this.socket.on('error', callback);
    }
  }

  offError() {
    if (this.socket) {
      this.socket.off('error');
    }
  }

  getSocket() {
    return this.socket;
  }
}

export default new SocketService();
