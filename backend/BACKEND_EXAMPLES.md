/**
 * BACKEND_EXAMPLES.md - Code Examples and Patterns
 */

# Backend Examples & Patterns

## Authentication Examples

### Example 1: Create Login Endpoint

**File:** `src/auth/auth.controller.ts`

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      statusCode: 200,
      message: 'Login successful',
      data: result,
    };
  }
}
```

### Example 2: Use Authentication in Another Module

**File:** `src/user/user.controller.ts`

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return this.userService.getProfile(user.id);
  }
}
```

## Service Examples

### Example 3: Service with Database Operations

**File:** `src/user/user.service.ts`

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CONSTANTS } from '../common/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  }

  async updateProfile(id: string, data: any) {
    const user = await this.userModel.findByIdAndUpdate(id, data, { new: true });
    return {
      statusCode: 200,
      message: 'Profile updated',
      data: user,
    };
  }

  async listUsers(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    
    const total = await this.userModel.countDocuments();
    
    return {
      data: users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }
}
```

## Socket.IO Examples

### Example 4: Socket.IO Gateway

**File:** `src/chat/chat.gateway.ts`

```typescript
import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CONSTANTS } from '../common/constants';

@WebSocketGateway({
  cors: {
    origin: process.env.SOCKET_IO_CORS_ORIGIN,
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map();

  @SubscribeMessage(CONSTANTS.SOCKET_EVENTS.JOIN_ROOM)
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; username: string }
  ) {
    client.join(data.room);
    this.onlineUsers.set(client.id, { username: data.username, room: data.room });
    
    this.server.to(data.room).emit(CONSTANTS.SOCKET_EVENTS.USER_JOINED, {
      message: `${data.username} joined the room`,
      onlineUsers: this.getOnlineUsersForRoom(data.room),
    });
  }

  @SubscribeMessage(CONSTANTS.SOCKET_EVENTS.SEND_MESSAGE)
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; content: string; username: string }
  ) {
    // Validate message length
    if (data.content.length > CONSTANTS.MAX_MESSAGE_LENGTH) {
      client.emit('error', { message: 'Message too long' });
      return;
    }

    // Broadcast to room
    this.server.to(data.room).emit(CONSTANTS.SOCKET_EVENTS.RECEIVE_MESSAGE, {
      id: crypto.randomUUID(),
      username: data.username,
      content: data.content,
      room: data.room,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage(CONSTANTS.SOCKET_EVENTS.LEAVE_ROOM)
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string }
  ) {
    client.leave(data.room);
    const user = this.onlineUsers.get(client.id);
    this.onlineUsers.delete(client.id);
    
    if (user) {
      this.server.to(data.room).emit(CONSTANTS.SOCKET_EVENTS.USER_LEFT, {
        message: `${user.username} left the room`,
        onlineUsers: this.getOnlineUsersForRoom(data.room),
      });
    }
  }

  private getOnlineUsersForRoom(room: string) {
    return Array.from(this.onlineUsers.values()).filter(
      (user) => user.room === room
    );
  }
}
```

## DTO and Validation Examples

### Example 5: Create and Use DTOs

**File:** `src/auth/dtos/register.dto.ts`

```typescript
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(50, { message: 'Username cannot exceed 50 characters' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
```

**File:** `src/auth/auth.controller.ts` (Using DTO)

```typescript
@Controller('auth')
export class AuthController {
  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      statusCode: 201,
      message: CONSTANTS.SUCCESS_MESSAGES.REGISTER_SUCCESS,
      data: user,
    };
  }
}
```

## Utility Function Examples

### Example 6: Using Utility Functions

**File:** `src/auth/auth.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { hashPassword, comparePasswords } from '../common/utils';
import { CONSTANTS } from '../common/constants';

@Injectable()
export class AuthService {
  async register(registerDto: any) {
    // Hash password using util
    const hashedPassword = await hashPassword(registerDto.password);

    // Create user with hashed password
    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  }

  async login(loginDto: any) {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException(
        CONSTANTS.ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    // Compare password using util
    const isMatch = await comparePasswords(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(
        CONSTANTS.ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      username: user.username,
    });

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
```

## Error Handling Examples

### Example 7: Proper Error Handling

**File:** `src/user/user.controller.ts`

```typescript
import { Controller, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { CONSTANTS } from '../common/constants';

@Controller('users')
export class UserController {
  @Get(':id')
  async getUser(@Param('id') id: string) {
    // Validate ID format
    if (!id.match(/^[0-9a-f]{24}$/i)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      statusCode: 200,
      message: 'User found',
      data: user,
    };
  }
}
```

## Pagination Example

### Example 8: Paginated Results

**File:** `src/chat/chat.controller.ts`

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { CONSTANTS } from '../common/constants';

@Controller('messages')
export class ChatController {
  @Get()
  async getMessages(
    @Query('room') room: string,
    @Query('page') page: number = CONSTANTS.DEFAULT_PAGE,
    @Query('limit') limit: number = CONSTANTS.DEFAULT_LIMIT
  ) {
    if (limit > CONSTANTS.MAX_LIMIT) {
      limit = CONSTANTS.MAX_LIMIT;
    }

    const messages = await this.chatService.getMessages(room, page, limit);

    return {
      statusCode: 200,
      message: 'Messages retrieved',
      data: messages.data,
      pagination: {
        page,
        limit,
        total: messages.total,
        pages: Math.ceil(messages.total / limit),
      },
    };
  }
}
```

## Custom Decorator Example

### Example 9: Create Custom Decorator

**File:** `src/common/decorators/current-user.decorator.ts`

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // From JWT strategy
  },
);
```

**Usage:**
```typescript
@Get('profile')
getProfile(@CurrentUser() user: any) {
  return this.userService.getProfile(user.id);
}
```

## Full Feature Example

### Example 10: Complete Chat Feature

**Files to Create:**
1. `src/chat/dtos/send-message.dto.ts`
2. `src/chat/chat.service.ts` (update)
3. `src/chat/chat.controller.ts` (new)

**Step 1: DTO**
```typescript
// send-message.dto.ts
export class SendMessageDto {
  @IsString()
  room: string;

  @IsString()
  @MaxLength(1000)
  content: string;
}
```

**Step 2: Service**
```typescript
// chat.service.ts
@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async sendMessage(userId: string, dto: SendMessageDto) {
    const message = await this.messageModel.create({
      userId,
      room: dto.room,
      content: dto.content,
      username: user.username,
      avatar: user.avatar,
    });

    return message;
  }

  async getMessages(room: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const messages = await this.messageModel
      .find({ room })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.messageModel.countDocuments({ room });
    return { data: messages, total };
  }
}
```

**Step 3: Controller**
```typescript
// chat.controller.ts
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  @Post('messages')
  sendMessage(
    @CurrentUser() user: any,
    @Body() dto: SendMessageDto
  ) {
    return this.chatService.sendMessage(user.id, dto);
  }

  @Get('messages')
  getMessages(
    @Query('room') room: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.chatService.getMessages(room, page, limit);
  }
}
```

---

**Tips:**
- ✅ Always validate input with DTOs
- ✅ Use constants for repeated values
- ✅ Handle errors gracefully
- ✅ Log important operations
- ✅ Use async/await properly
- ✅ Don't expose sensitive data in responses
- ✅ Rate limit sensitive endpoints
- ✅ Cache frequently accessed data

**Last Updated:** March 17, 2026
