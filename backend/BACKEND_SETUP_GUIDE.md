/**
 * BACKEND_SETUP_GUIDE.md - Step-by-step Backend Setup
 */

# Backend Setup Guide

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- npm 9+

## Installation

### Step 1: Environment Setup

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your values
# - Update MONGODB_URI with your MongoDB connection string
# - Change JWT_SECRET to a random string
# - Set CORS_ORIGIN to frontend URL
```

Example `.env`:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chat-app
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:5173
```

### Step 2: Install Dependencies

```bash
npm install
```

Dependencies added:
- `@nestjs/common` - NestJS core
- `@nestjs/jwt` - JWT authentication
- `@nestjs/passport` - Passport.js integration
- `@nestjs/mongoose` - MongoDB integration
- `@nestjs/websockets` - Socket.IO support
- `passport-jwt` - JWT strategy
- `passport-local` - Local strategy
- `bcrypt` - Password hashing
- `class-validator` - DTO validation
- `class-transformer` - DTO transformation
- `dotenv` - Environment variables

### Step 3: Update Main Entry Point

Replace `src/main.ts` with content from `src/main.ts.example`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { APP_CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: APP_CONFIG.isDevelopment 
      ? ['log', 'debug', 'error', 'warn'] 
      : ['error', 'warn'],
  });

  app.enableCors({
    origin: APP_CONFIG.corsOrigin,
    credentials: true,
  });

  // Global Filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global Interceptors
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(),
    new TimeoutInterceptor(),
  );

  await app.listen(APP_CONFIG.port);
  console.log(`✓ Application running on port ${APP_CONFIG.port}`);
}

bootstrap();
```

### Step 4: Update App Module

Replace `src/app.module.ts` with content from `src/app.module.ts.example`:

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONFIG } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONFIG.uri, DATABASE_CONFIG.options),
    ChatModule,
    UserModule,
    AuthModule,
  ],
  //...
})
export class AppModule {}
```

### Step 5: Update Auth Module

Replace `src/auth/auth.module.ts` with content from `src/auth/auth.module.ts.example`:

```typescript
import { Module } from '@nestjs/common';
import { JWT_CONFIG } from '../config';

@Module({
  imports: [
    JwtModule.register(JWT_CONFIG),
    // ... other imports
  ],
  // ...
})
export class AuthModule {}
```

### Step 6: Verify Installation

```bash
# Build the application
npm run build

# Should compile without errors
```

## Running the Application

### Development

```bash
npm run start:dev
```

You should see:
```
✓ Application running on port 3000
✓ Environment: development
```

### Production

```bash
npm run build
npm run start:prod
```

## Testing

### Test Authentication Endpoint

```bash
# Register new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Response:
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "...",
      "username": "testuser",
      "email": "test@example.com"
    }
  },
  "timestamp": "2026-03-17T10:30:00Z"
}
```

### Test Protected Endpoint

```bash
# Get user profile (requires token)
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer eyJhbGc..."
```

### Test Socket.IO

Open DevTools Console:
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token-here'
  }
});

socket.on('connect', () => {
  console.log('Connected');
  socket.emit('joinRoom', { room: 'en' });
});

socket.on('receiveMessage', (msg) => {
  console.log('Message:', msg);
});
```

## Common Issues

| Issue | Solution |
|-------|----------|
| `Cannot find module '@nestjs/common'` | Run `npm install` |
| `MongoDB connection failed` | Check MONGODB_URI in .env |
| `JWT error: secret not defined` | Update JWT_SECRET in .env |
| `Port 3000 already in use` | Change PORT in .env or kill process |
| `CORS error` | Update CORS_ORIGIN in .env |

## Useful Commands

```bash
# Install specific package
npm install package-name

# Remove package
npm uninstall package-name

# Update all packages
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Run linter
npm run lint

# Run tests
npm run test
```

## Structure at a Glance

**Before:**
```
src/
├── auth/
├── chat/
├── user/
├── app.module.ts
├── app.service.ts
└── main.ts
```

**After:**
```
src/
├── config/              # NEW - Configuration
├── common/              # NEW - Shared utilities
│   ├── constants/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   └── utils/
├── database/            # NEW - DB setup
├── auth/
│   └── dtos/            # NEW - Validation
├── chat/
│   └── dtos/            # NEW - Validation
├── user/
│   └── dtos/            # NEW - Validation
├── main.ts              # UPDATED
├── app.module.ts        # UPDATED
└── ...
```

## Next Steps

1. ✅ Set up environment variables
2. ✅ Update main.ts with filters/interceptors
3. ✅ Update app.module.ts with config
4. ✅ Update auth.module.ts with JWT config
5. ⬜ Add DTOs to controllers
6. ⬜ Update services to use constants
7. ⬜ Add rate limiting to sensitive routes
8. ⬜ Add logging middleware
9. ⬜ Deploy to production

## Production Deployment

Before deploying to production:

1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   JWT_SECRET=use-strong-secret-in-prod
   MONGODB_URI=production-db-uri
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Run Production**
   ```bash
   npm run start:prod
   ```

4. **Monitor Logs**
   ```bash
   npm run start:prod | tee app.log
   ```

## Monitoring & Debugging

Enable detailed logging:

```typescript
// src/main.ts
const app = await NestFactory.create(AppModule, {
  logger: ['log', 'debug', 'error', 'warn', 'verbose'],
});
```

Check logs for:
- Database connection status
- JWT token validation
- Socket.IO connections
- Request/response timing
- Error stack traces

---

**Status:** 🟢 Ready to Setup  
**Estimated Time:** 15-30 minutes  
**Last Updated:** March 17, 2026
