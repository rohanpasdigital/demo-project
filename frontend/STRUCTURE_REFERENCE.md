/**
 * STRUCTURE_REFERENCE.md - Complete folder and file reference
 */

# Frontend Structure Reference

```
frontend/
├── .env                              # Environment variables (local)
├── .env.example                      # Example environment file
├── .npmrc                            # NPM configuration
├── .gitignore
├── package.json                      # Dependencies ✅ Updated with Redux Toolkit
├── tsconfig.json
├── vite.config.ts
├── index.html
│
├── ARCHITECTURE.md                   # ✅ NEW - Architecture overview
├── EXAMPLES.md                       # ✅ NEW - Usage examples
├── MIGRATION_GUIDE.md               # ✅ NEW - Migration instructions
├── STRUCTURE_REFERENCE.md           # ✅ NEW - This file
│
├── dist/                             # Build output
└── src/
    ├── main.tsx                      # Entry point
    ├── App.tsx                       # Root component (needs Redux update)
    ├── App.example.tsx               # ✅ NEW - Example with Redux
    ├── App.css
    ├── index.css
    │
    ├── api/                          # Legacy API services (being replaced)
    │   └── (deprecated - use store/api instead)
    │
    ├── components/                   # Global reusable components
    │   ├── Avatar.tsx                # User avatar
    │   ├── ChatArea.tsx              # Chat display area
    │   ├── LanguageList.tsx          # Language/room selector
    │   ├── LoginModal.tsx            # Login form modal
    │   ├── MessageItem.tsx           # Single message bubble
    │   └── Sidebar.tsx               # Sidebar with rooms & profile
    │
    ├── config/                       # Configuration
    │   └── environment.ts            # Environment variables
    │
    ├── constants/                    # ✅ NEW - Constants
    │   └── index.ts                  # Languages, API endpoints, Socket events
    │
    ├── context/                      # React Context (kept for backward compat)
    │   └── AuthContext.tsx           # Auth context (can be deprecated)
    │
    ├── features/                     # ✅ NEW - Feature-based modules
    │   ├── auth/
    │   │   ├── components/
    │   │   │   └── (auth-specific components)
    │   │   ├── pages/
    │   │   │   └── (auth pages)
    │   │   ├── hooks/
    │   │   │   └── (auth hooks)
    │   │   ├── store/                # (optional) auth feature store
    │   │   └── index.ts              # Public API
    │   │
    │   └── chat/
    │       ├── components/
    │       │   ├── ChatArea.tsx      # Main chat area
    │       │   ├── MessageItem.tsx   # Message bubble
    │       │   ├── LanguageList.tsx  # Room selector
    │       │   └── Sidebar.tsx       # Chat sidebar
    │       ├── pages/
    │       │   └── ChatPage.tsx      # Chat page layout
    │       ├── hooks/
    │       │   └── (chat-specific hooks)
    │       ├── store/                # (optional) chat feature store
    │       └── index.ts              # Public API
    │
    ├── hooks/                        # ✅ Custom hooks folder reorganized
    │   ├── useSocket.ts              # ✅ NEW - Socket.IO hooks
    │   ├── state/
    │   │   └── useRedux.ts           # ✅ NEW - Redux hooks with types
    │   └── api/
    │       └── (RTK Query hooks auto-generated)
    │
    ├── layout/                       # ✅ NEW - Layout components
    │   └── MainLayout.tsx            # Main layout wrapper
    │
    ├── middleware/                   # ✅ NEW - Redux middleware
    │   └── socketMiddleware.ts       # Optional: Socket.IO middleware
    │
    ├── pages/                        # Page-level components
    │   └── ChatPage.tsx              # Main chat page
    │
    ├── services/                     # External services
    │   ├── authService.ts            # Auth API (being replaced by RTK Query)
    │   └── socketService.ts          # Socket.IO manager
    │
    ├── store/                        # ✅ NEW - Redux Toolkit store
    │   ├── api/                      # ✅ NEW - RTK Query API slices
    │   │   ├── baseApi.ts            # ✅ Base API configuration
    │   │   ├── authApi.ts            # ✅ Auth endpoints
    │   │   ├── chatApi.ts            # ✅ Chat/Message endpoints
    │   │   └── userApi.ts            # ✅ User endpoints
    │   │
    │   ├── slices/                   # ✅ NEW - Redux slices
    │   │   ├── authSlice.ts          # ✅ Auth state
    │   │   ├── chatSlice.ts          # ✅ Chat state
    │   │   ├── uiSlice.ts            # (optional) UI state
    │   │   └── notificationSlice.ts  # (optional) Notifications
    │   │
    │   └── index.ts                  # ✅ Store configuration
    │
    ├── types/                        # TypeScript types
    │   └── index.ts                  # All interfaces & types
    │
    └── utils/                        # ✅ NEW - Utility functions
        └── index.ts                  # Token, user, date, error helpers
```

## File Status Legend

| Symbol | Status | Notes |
|--------|--------|-------|
| ✅ | NEW/CREATE | New files created as part of restructure |
| (blank) | EXISTING | Part of original codebase |
| (deprecated) | OLD | Being phased out, can be removed |

## Key Files to Update

### Must Update
- [ ] `src/App.tsx` - Add Redux Provider (see App.example.tsx)
- [ ] `package.json` - ✅ Redux dependencies added

### Should Update Soon
- [ ] `src/components/*` - Move to `features/*/components/`
- [ ] `src/pages/*` - Move to `features/*/pages/`
- [ ] `src/services/authService.ts` - Replaced by RTK Query

### Optional (Keep as is initially)
- [ ] `src/context/AuthContext.tsx` - Can coexist with Redux
- [ ] `src/hooks/useChat.ts` - Replace with useSocket hooks
- [ ] `src/hooks/useAuthForm.ts` - Move to `features/auth/hooks/`

## Directory Size Guide

For a **100K+ line codebase**:

```
src/
├── features/              # 60-70% of code
│   ├── auth/             # 10,000 lines
│   ├── chat/             # 20,000 lines
│   ├── dashboard/        # 15,000 lines
│   ├── search/           # 10,000 lines
│   └── settings/         # 10,000 lines
├── store/                # 5-10% of code
├── hooks/                # 5-10% of code
├── components/           # 5-10% of code (global only)
├── utils/                # 3-5% of code
├── types/                # 2-3% of code
├── config/               # 1-2% of code
└── constants/            # 1-2% of code
```

## Adding New Features

When adding a new feature (e.g., "notifications"):

```bash
# 1. Create feature folder structure
mkdir -p src/features/notifications/{components,pages,hooks,store}

# 2. Create RTK Query API slice (if needed)
touch src/store/api/notificationApi.ts

# 3. Create Redux slice for state
touch src/store/slices/notificationSlice.ts

# 4. Create page components
touch src/features/notifications/pages/NotificationsPage.tsx

# 5. Create reusable components
touch src/features/notifications/components/NotificationItem.tsx
touch src/features/notifications/components/NotificationList.tsx

# 6. Create custom hooks
touch src/features/notifications/hooks/useNotifications.ts

# 7. Export public API
echo "export * from './pages';
export * from './components';" > src/features/notifications/index.ts
```

## Database of Endpoints

### API Endpoints (in constants/index.ts)
```typescript
API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',      // POST
    LOGIN: '/auth/login',             // POST
    LOGOUT: '/auth/logout',           // POST
    REFRESH: '/auth/refresh',         // POST
  },
  MESSAGES: {
    GET_BY_ROOM: '/messages/:room',  // GET
    DELETE: '/messages/:id',          // DELETE
  },
  USERS: {
    GET_PROFILE: '/users/profile',   // GET
    UPDATE_PROFILE: '/users/profile', // PUT
  },
}
```

### Socket Events (in constants/index.ts)
```typescript
SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
  SEND_MESSAGE: 'sendMessage',
  RECEIVE_MESSAGE: 'message',
  PREVIOUS_MESSAGES: 'previousMessages',
  ERROR: 'error',
}
```

## Performance Benchmarks

Expected with this structure:

| Metric | Target | Notes |
|--------|--------|-------|
| Initial Load | < 3s | With code splitting |
| RTK Query Cache | Instant | For cached data |
| Mutation Response | < 500ms | API dependent |
| Socket.IO Connect | < 500ms | Network dependent |
| Redux Dispatch | < 10ms | State update |

## Type Safety Checklist

- ✅ All Redux actions typed
- ✅ All Redux state typed  
- ✅ RTK Query endpoints typed
- ✅ Socket.IO messages typed
- ✅ API responses typed
- ✅ Component props typed
- ✅ Custom hooks typed

## Next Improvements (100K+ Lines)

1. **Error Boundaries**
   ```
   src/components/ErrorBoundary.tsx
   src/features/*/ErrorBoundary.tsx
   ```

2. **Testing Structure**
   ```
   src/__tests__/
   ├── store/
   ├── hooks/
   ├── utils/
   └── features/
   ```

3. **Internationalization**
   ```
   src/i18n/
   ├── en.json
   ├── hi.json
   └── index.ts
   ```

4. **Performance Optimization**
   ```
   src/performance/
   ├── analytics.ts
   ├── monitoring.ts
   └── logger.ts
   ```

5. **Advanced Features**
   ```
   src/features/
   ├── analytics/
   ├── ai/
   ├── notifications/
   └── real-time-sync/
   ```

---

**Last Updated:** March 17, 2026
**Status:** Production-Ready Foundation
**Next Milestone:** 50K+ Lines of Code
