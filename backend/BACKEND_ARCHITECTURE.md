/**
 * BACKEND_ARCHITECTURE.md - Backend Architecture Documentation
 */

# Backend Architecture

## Overview

The backend uses **NestJS** with a modular, scalable architecture designed to support growth to 100K+ lines of code.

## Folder Structure

```
backend/src/
├── config/                 # Configuration management
│   ├── app.config.ts       # App settings
│   ├── database.config.ts  # MongoDB configuration
│   ├── jwt.config.ts       # JWT settings
│   └── index.ts            # Config exports
├── common/                 # Shared utilities
│   ├── constants/          # Constants (LANGUAGES, SOCKET_EVENTS, etc)
│   ├── decorators/         # Custom decorators (@Public, @RateLimit)
│   ├── filters/            # Exception filters (AllExceptionsFilter)
│   ├── interceptors/       # Response/Request interceptors
│   ├── pipes/              # Validation pipes
│   └── utils/              # Helper functions
├── database/               # Database configuration
│   └── schemas/            # Database schemas
├── auth/                   # Authentication module
│   ├── dtos/               # Data Transfer Objects
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── local.strategy.ts
│   └── jwt-auth.guard.ts
├── chat/                   # Chat module (real-time messaging)
│   ├── dtos/
│   ├── chat.gateway.ts     # Socket.IO gateway
│   ├── chat.module.ts
│   └── message.schema.ts
├── user/                   # User management module
│   ├── dtos/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   └── user.schema.ts
└── main.ts                 # Entry point
```

## Configuration

All sensitive configuration uses environment variables via `.env` file:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:5173
```

See `.env.example` for all available options.

## Key Concepts

### 1. Modules
- **AuthModule** - Handles authentication (login, register, JWT)
- **ChatModule** - Real-time messaging with Socket.IO
- **UserModule** - User profile and management

Each module is self-contained with:
- Controllers (HTTP endpoints)
- Services (business logic)
- DTOs (request/response validation)
- Schemas (database models)

### 2. DTOs (Data Transfer Objects)
Request/response validation:
- `LoginDto` - Email + Password
- `RegisterDto` - User registration
- `SendMessageDto` - New message
- `UpdateProfileDto` - Profile updates

Located in `module/dtos/` folder.

### 3. Guards & Strategies
- **JwtStrategy** - Validates JWT tokens
- **LocalStrategy** - Username/password validation
- **JwtAuthGuard** - Protects routes requiring auth

### 4. Filters & Interceptors
- **AllExceptionsFilter** - Globally handles all errors
- **ResponseTransformInterceptor** - Formats all responses consistently
- **TimeoutInterceptor** - Sets HTTP timeout

### 5. Decorators
- `@Public()` - Mark routes as public (no auth required)
- `@RateLimit()` - Apply rate limiting to endpoints

### 6. Constants
Central location for app values:
```typescript
CONSTANTS.SOCKET_EVENTS  // Socket.IO events
CONSTANTS.ERROR_MESSAGES  // Error messages
CONSTANTS.LANGUAGES       // Supported languages
CONSTANTS.MAX_MESSAGE_LENGTH // Validation limits
```

## Response Format

All responses follow a consistent format:

**Success (200):**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { /* response data */ },
  "timestamp": "2026-03-17T10:30:00Z"
}
```

**Error (4xx/5xx):**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "BadRequest",
  "timestamp": "2026-03-17T10:30:00Z"
}
```

## Socket.IO Events

Real-time events defined in `CONSTANTS.SOCKET_EVENTS`:

```
- joinRoom      // User joins a language room
- leaveRoom     // User leaves a room
- sendMessage   // Send new message
- receiveMessage // Receive message (broadcast)
- typing        // User is typing
- onlineUsers   // List of online users
- userJoined    // User connected notification
- userLeft      // User disconnected notification
```

Handled in `chat/chat.gateway.ts`.

## Authentication Flow

1. User registers with email/password
2. Backend hashes password with bcrypt
3. User logs in → JWT token generated
4. Token stored in browser localStorage
5. Token sent with every request (Authorization header)
6. JwtStrategy validates token
7. User data attached to request

## Database Schema

### User Schema
```typescript
{
  _id: ObjectId
  username: string (unique)
  email: string (unique)
  password: string (hashed)
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
```

### Message Schema
```typescript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  username: string
  room: string (language)
  content: string
  avatar?: string
  createdAt: Date
}
```

## Adding New Features

### Adding a New Module

1. Create folder: `src/modules/featureName/`
2. Create subfolders:
   ```
   dtos/          # DTOs for validation
   ```
3. Create files:
   - `feature.module.ts` - Module definition
   - `feature.controller.ts` - HTTP endpoints
   - `feature.service.ts` - Business logic
   - `feature.schema.ts` - Database model

4. Import in `app.module.ts`

### Adding a New Endpoint

1. Create DTO in `module/dtos/endpoint.dto.ts`:
```typescript
import { IsString, IsEmail } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

2. Add method to service:
```typescript
async create(data: CreateItemDto) {
  // Business logic
}
```

3. Add route to controller:
```typescript
@Post()
create(@Body() dto: CreateItemDto) {
  return this.service.create(dto);
}
```

### Adding Socket.IO Event

1. Add to `CONSTANTS.SOCKET_EVENTS`:
```typescript
CUSTOM_EVENT: 'customEvent',
```

2. Add handler in `chat.gateway.ts`:
```typescript
@SubscribeMessage('customEvent')
handleCustomEvent(client: Socket, data: any) {
  // Handle event
}
```

## Error Handling

All errors automatically caught by `AllExceptionsFilter`:

```typescript
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Invalid credentials');
throw new ForbiddenException('Access denied');
throw new NotFoundException('User not found');
throw new InternalServerErrorException('Database error');
```

## Scaling Considerations

This architecture supports 100K+ lines through:

1. **Modular Design** - Features are isolated in separate modules
2. **Clear Separation** - Controllers → Services → Utilities
3. **Type Safety** - Full TypeScript with strict mode
4. **Centralized Config** - All settings in one place
5. **Reusable Guards** - Share auth logic across modules
6. **Common Utils** - Shared helper functions
7. **Constants** - Single source of truth
8. **DTOs** - Validation at entry point

## Performance Tips

1. Use caching for frequently accessed data
2. Paginate large result sets
3. Index database fields
4. Implement rate limiting for API endpoints
5. Use async/await properly
6. Monitor Socket.IO connection count

## Security

- JWT tokens signed with strong secret
- Passwords hashed with bcrypt (10 rounds)
- CORS configured to whitelist origins
- Rate limiting on sensitive endpoints
- Input validation on all routes
- SQL injection prevention (MongoDB + ODM)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run start:dev

# Build production
npm run build

# Run production
npm run start:prod

# Run tests
npm run test

# Lint code
npm run lint
```

## Migration Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Update configuration values
- [ ] Review `main.ts.example` for setup
- [ ] Review `app.module.ts.example` for imports
- [ ] Update auth module with config
- [ ] Test authentication flow
- [ ] Test Socket.IO connection
- [ ] Run build and verify no errors

## Next Steps

1. Set up `.env` with your values
2. Update `main.ts` with filters/interceptors
3. Update `app.module.ts` with DATABASE_CONFIG
4. Update `auth.module.ts` with JWT_CONFIG
5. Create utility functions in `common/utils/`
6. Add new modules following the pattern
7. Test all endpoints with Postman/Insomnia
8. Deploy to production

---

**Version:** v1.0  
**Last Updated:** March 17, 2026  
**Status:** 🟢 Ready to Implement
