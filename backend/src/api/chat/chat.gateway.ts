import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Message, MessageDocument } from './message.schema';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    const messages = await this.messageModel
      .find({ room })
      .sort({ timestamp: 1 })
      .limit(50);
    client.emit('previousMessages', messages);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    data: { room: string; content: string; sender: string; token?: string },
  ) {
    try {
      // Validate token and extract user info
      if (!data.token) {
        client.emit('error', { message: 'Authentication token is required' });
        return;
      }

      let decoded: any;
      try {
        decoded = this.jwtService.verify(data.token);
      } catch (error) {
        client.emit('error', { message: 'Invalid or expired token' });
        return;
      }

      // Verify sender matches token
      if (decoded.username !== data.sender && decoded.name !== data.sender) {
        client.emit('error', { message: 'Unauthorized: sender mismatch' });
        return;
      }

      // Save message with authenticated user info
      const message = new this.messageModel({
        room: data.room,
        content: data.content,
        sender: decoded.name || decoded.username,
        timestamp: new Date(),
      });

      await message.save();

      // Broadcast to room
      this.server.to(data.room).emit('message', message);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      client.emit('error', { message: 'Failed to send message' });
    }
  }
}
