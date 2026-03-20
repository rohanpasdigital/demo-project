/**
 * BACKEND_STRUCTURE_REFERENCE.md - Complete Structure Reference
 */

# Backend Structure Reference

## Complete File Tree

```
backend/
├── src/
│   ├── config/
│   │   ├── app.config.ts           # APP_CONFIG (port, env, cors)
│   │   ├── database.config.ts       # DATABASE_CONFIG (MongoDB URI)
│   │   ├── jwt.config.ts            # JWT_CONFIG (secret, expiration) + JwtPayload interface
│   │   └── index.ts                 # Export all configs
│   │
│   ├── common/
│   │   ├── constants/
│   │   │   └── index.ts             # CONSTANTS (socket events, messages, limits)
│   │   │
│   │   ├── decorators/
│   │   │   ├── public.decorator.ts   # @Public() - Skip auth on routes
│   │   │   └── rate-limit.decorator.ts # @RateLimit() - Rate limiting
│   │   │
│   │   ├── filters/
│   │   │   └── all-exceptions.filter.ts # Global error handler
│   │   │
│   │   ├── interceptors/
│   │   │   ├── response.interceptor.ts  # Format responses
│   │   │   └── timeout.interceptor.ts   # HTTP timeout
│   │   │
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts       # DTO validation
│   │   │
│   │   └── utils/
│   │       └── index.ts             # Utility functions (hash, email, token, etc)
│   │
│   ├── database/
│   │   └── schemas/                 # Database schemas (User, Message)
│   │
│   ├── auth/
│   │   ├── dtos/
│   │   │   ├── login.dto.ts         # { email, password }
│   │   │   ├── register.dto.ts      # { username, email, password }
│   │   │   └── auth-response.dto.ts # Response format
│   │   ├── auth.controller.ts       # POST /auth/login, /auth/register
│   │   ├── auth.service.ts          # Login, register business logic
│   │   ├── auth.module.ts           # AuthModule with JWT config
│   │   ├── jwt.strategy.ts          # JWT validation strategy
│   │   ├── jwt-auth.guard.ts        # @UseGuards(JwtAuthGuard)
│   │   ├── local.strategy.ts        # Local auth strategy
│   │   ├── local-auth.guard.ts      # Local auth guard
│   │   ├── auth.controller.spec.ts  # Tests
│   │   └── auth.service.spec.ts     # Tests
│   │
│   ├── chat/
│   │   ├── dtos/
│   │   │   ├── send-message.dto.ts  # { room, content, language }
│   │   │   └── get-messages.dto.ts  # Query validation
│   │   ├── chat.gateway.ts          # Socket.IO handlers
│   │   ├── chat.module.ts           # ChatModule
│   │   ├── message.schema.ts        # Message database schema
│   │   ├── chat.gateway.spec.ts     # Tests
│   │   └── chat.controller.ts       # (Optional) REST endpoints
│   │
│   ├── user/
│   │   ├── dtos/
│   │   │   ├── update-profile.dto.ts # Profile updates
│   │   │   └── user-response.dto.ts  # User response format
│   │   ├── user.controller.ts       # GET /users/profile, etc
│   │   ├── user.service.ts          # User business logic
│   │   ├── user.module.ts           # UserModule
│   │   ├── user.schema.ts           # User database schema
│   │   ├── user.controller.spec.ts  # Tests
│   │   └── user.service.spec.ts     # Tests
│   │
│   ├── app.controller.ts            # Global or app routes
│   ├── app.service.ts               # Global services
│   ├── app.module.ts                # Root module (NEEDS UPDATE)
│   ├── main.ts                      # Entry point (NEEDS UPDATE)
│   ├── app.controller.spec.ts       # Tests
│
├── .env.example                     # Environment template
├── src/main.ts.example              # Main entry point example
├── src/app.module.ts.example        # App module example
├── src/auth/auth.module.ts.example  # Auth module example
│
├── BACKEND_ARCHITECTURE.md          # Architecture overview
├── BACKEND_SETUP_GUIDE.md          # Step-by-step setup
├── BACKEND_EXAMPLES.md             # Code examples and patterns
├── BACKEND_STRUCTURE_REFERENCE.md  # This file
│
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── .gitignore                       # Git ignore rules
├── nest-cli.json                    # NestJS CLI config
└── README.md                        # Project readme
```

## File Descriptions

### Config Files

**app.config.ts**
- Exports `APP_CONFIG` object
- Configurations: port, environment, isDevelopment, isProduction, corsOrigin
- Reads from environment variables with defaults

**database.config.ts**
- Exports `DATABASE_CONFIG` object
- Configurations: MongoDB URI and connection options
- Reads from MONGODB_URI env var

**jwt.config.ts**
- Exports `JWT_CONFIG` object
- Configurations: JWT secret and expiration
- Exports `JwtPayload` interface for type safety
- Used by JwtModule.register()

### Common Utilities

**constants/index.ts**
- Central location for all constants
- SOCKET_EVENTS - All Socket.IO event names
- ERROR_MESSAGES - Standard error messages
- SUCCESS_MESSAGES - Standard success messages
- SUPPORTED_LANGUAGES - Language array
- Validation limits (max message length, password requirements, etc)

**utils/index.ts**
- `hashPassword()` - Bcrypt password hashing
- `comparePasswords()` - Bcrypt password comparison
- `generateToken()` - Random token generation
- `isValidEmail()` - Email validation
- `isValidUsername()` - Username validation
- `formatErrorResponse()` - Standard error format
- `formatSuccessResponse()` - Standard success format
- `sleep()` - Promise delay
- `paginate()` - Pagination helper
- `generateSlug()` - URL slug generation

### Common Infrastructure

**decorators/public.decorator.ts**
- `@Public()` - Mark routes that don't require authentication
- Used in controllers to bypass JwtAuthGuard

**decorators/rate-limit.decorator.ts**
- `@RateLimit({windowMs, max})` - Rate limiting per endpoint
- windowMs: time window in milliseconds
- max: max requests in window

**filters/all-exceptions.filter.ts**
- Global exception handler
- Catches ALL exceptions (Http, Error, unknown)
- Formats error responses consistently

**interceptors/response.interceptor.ts**
- Formats all successful responses
- Wraps data in standard response object
- Adds timestamp

**interceptors/timeout.interceptor.ts**
- Sets 30-second timeout on all requests
- Uses CONSTANTS.HTTP_TIMEOUT

**pipes/validation.pipe.ts**
- Validates request body against DTOs
- Uses class-validator and class-transformer
- Throws BadRequestException with field errors

### Auth Module

**auth.controller.ts**
- Endpoints:
  - `POST /auth/register` - Register new user
  - `POST /auth/login` - Login user
  - `POST /auth/logout` - Logout (optional)

**auth.service.ts**
- Business logic for:
  - User registration
  - User login
  - Token generation
  - Password hashing and validation

**auth.module.ts**
- Imports: MongooseModule (User), PassportModule, JwtModule
- Providers: AuthService, LocalStrategy, JwtStrategy
- Controllers: AuthController
- Exports: AuthService (for other modules)

**jwt.strategy.ts**
- Implements Passport JwtStrategy
- Validates JWT tokens
- Extracts user data from token
- Called by JwtAuthGuard

**jwt-auth.guard.ts**
- `@UseGuards(JwtAuthGuard)` - Protect routes
- Uses JwtStrategy for validation
- Checks IS_PUBLIC_KEY to skip auth if marked @Public()

**DTOs**
- `LoginDto` - Validates: email, password
- `RegisterDto` - Validates: username, email, password
- `AuthResponseDto` - Response format with token and user data

### Chat Module

**chat.gateway.ts**
- Socket.IO event handlers
- Events:
  - `joinRoom` - User joins language room
  - `leaveRoom` - User leaves room
  - `sendMessage` - Send new message
  - Other: typing, online users, etc
- Broadcasts to rooms
- Tracks online users

**chat.module.ts**
- Imports: MongooseModule (Message)
- Providers: (none yet, or ChatService)
- Gateways: ChatGateway

**message.schema.ts**
- MongoDB schema for messages
- Fields: userId, username, room, content, avatar, timestamps

**DTOs**
- `SendMessageDto` - Validates: room, content, language
- `GetMessagesDto` - Validates: room, page, limit

### User Module

**user.controller.ts**
- Endpoints:
  - `GET /users/profile` - Get current user profile
  - `PATCH /users/profile` - Update profile
  - `GET /users/:id` - Get user by ID

**user.service.ts**
- Business logic for:
  - Get user by ID
  - Update user profile
  - Get user list (paginated)

**user.module.ts**
- Imports: MongooseModule (User)
- Providers: UserService
- Controllers: UserController

**user.schema.ts**
- MongoDB schema for users
- Fields: username, email, password (hashed), avatar, timestamps
- Unique indexes on username and email

**DTOs**
- `UpdateProfileDto` - Validates: username, email, avatar (all optional)
- `UserResponseDto` - Response format (no password!)

### Root Module

**app.module.ts** (NEEDS UPDATE)
- Root application module
- Should import:
  - MongooseModule.forRoot(DATABASE_CONFIG.uri)
  - AuthModule
  - ChatModule
  - UserModule
- Controllers: AppController (or remove)
- Providers: AppService (or remove)

**main.ts** (NEEDS UPDATE)
- Application entry point
- Should:
  - Create NestFactory application
  - Enable CORS with APP_CONFIG.corsOrigin
  - Use global filters: AllExceptionsFilter
  - Use global interceptors: ResponseTransformInterceptor, TimeoutInterceptor
  - Listen on APP_CONFIG.port

## Request/Response Flow

### Login Request
```
1. POST /auth/login { email, password }
2. LoginDto validates input
3. AuthController calls AuthService.login()
4. AuthService validates credentials
5. JWT token generated
6. Response formatted by interceptor
7. Client receives { statusCode, data: { token, user }, timestamp }
```

### Protected Route Request
```
1. GET /users/profile with Authorization header
2. JwtAuthGuard intercepts request
3. JwtStrategy validates token
4. User attached to request
5. Controller calls service
6. Response formatted
7. Client receives response
```

### Socket.IO Connection
```
1. Client connects with JWT token
2. Gateway validates token
3. joinRoom event adds user to room
4. User receives list of online users
5. Messages broadcast to room
6. When user leaves, notification sent
```

## Environment Variables

**.env file should contain:**
```
NODE_ENV=development|production
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=long-random-string
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:5173
SOCKET_IO_CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug|info|warn|error
```

## Type Safety

**Key TypeScript Interfaces:**
- `JwtPayload` - JWT token payload structure
- `User` - MongoDB user document
- `Message` - MongoDB message document
- `Request` with `user` property
- `Socket` with custom auth data

## Dependencies Map

```
NestJS Core
├── @nestjs/common
├── @nestjs/core
├── @nestjs/platform-express

Authentication
├── @nestjs/jwt
├── @nestjs/passport
├── passport-jwt
├── passport-local
└── bcrypt

Database
├── @nestjs/mongoose
├── mongoose
└── mongodb

Real-time
├── @nestjs/websockets
├── socket.io
└── socket.io-client

Validation
├── class-validator
└── class-transformer

Development
├── @nestjs/cli
├── @nestjs/schematics
├── typescript
└── ts-loader
```

## Scaling Strategy

As your app grows:

1. **0-10K lines:**
   - Current structure works fine
   - Single database
   - Basic caching

2. **10K-50K lines:**
   - Add feature modules
   - Add database repositories
   - Implement proper logging
   - Add request/response logging

3. **50K-100K+ lines:**
   - Separate into microservices
   - Implement service-to-service communication
   - Add Redis caching
   - Database sharding/partitioning
   - API versioning

## File Organization Rules

1. **Group by feature** - auth/, chat/, user/ folders
2. **Separate concerns** - controllers, services, DTOs in own files
3. **Share utilities** - common/ folder for reusable code
4. **Config management** - config/ folder for environment-based settings
5. **Type definitions** - DTOs and interfaces with actual code
6. **Database schemas** - Keep with module

## Next Steps

✅ Folder structure created
✅ Config files created
✅ Common utilities created
✅ DTOs created
⬜ Update main.ts with actual code
⬜ Update app.module.ts with config
⬜ Update auth.module.ts with config
⬜ Add DTOs to controllers
⬜ Update services
⬜ Add logging
⬜ Deploy to production

---

**Version:** v1.0  
**Status:** 🟢 Ready for Implementation  
**Last Updated:** March 17, 2026
