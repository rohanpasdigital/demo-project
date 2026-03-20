"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const message_schema_1 = require("./message.schema");
let ChatGateway = class ChatGateway {
    messageModel;
    jwtService;
    server;
    constructor(messageModel, jwtService) {
        this.messageModel = messageModel;
        this.jwtService = jwtService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleJoinRoom(client, room) {
        client.join(room);
        const messages = await this.messageModel
            .find({ room })
            .sort({ timestamp: 1 })
            .limit(50);
        client.emit('previousMessages', messages);
    }
    handleLeaveRoom(client, room) {
        client.leave(room);
    }
    async handleSendMessage(client, data) {
        try {
            if (!data.token) {
                client.emit('error', { message: 'Authentication token is required' });
                return;
            }
            let decoded;
            try {
                decoded = this.jwtService.verify(data.token);
            }
            catch (error) {
                client.emit('error', { message: 'Invalid or expired token' });
                return;
            }
            if (decoded.username !== data.sender && decoded.name !== data.sender) {
                client.emit('error', { message: 'Unauthorized: sender mismatch' });
                return;
            }
            const message = new this.messageModel({
                room: data.room,
                content: data.content,
                sender: decoded.name || decoded.username,
                timestamp: new Date(),
            });
            await message.save();
            this.server.to(data.room).emit('message', message);
        }
        catch (error) {
            console.error('Error in sendMessage:', error);
            client.emit('error', { message: 'Failed to send message' });
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map