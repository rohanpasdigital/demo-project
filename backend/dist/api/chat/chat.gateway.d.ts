import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MessageDocument } from './message.schema';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private messageModel;
    private jwtService;
    server: Server;
    constructor(messageModel: Model<MessageDocument>, jwtService: JwtService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, room: string): Promise<void>;
    handleLeaveRoom(client: Socket, room: string): void;
    handleSendMessage(client: Socket, data: {
        room: string;
        content: string;
        sender: string;
        token?: string;
    }): Promise<void>;
}
