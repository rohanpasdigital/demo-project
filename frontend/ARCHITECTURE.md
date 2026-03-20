/**
 * Documentation for frontend structure
 */

# Frontend Architecture - Production Scale Structure

## Folder Structure

```
src/
├── api/                          # API client configurations
│   ├── axiosInstance.ts         # Axios setup (legacy, can deprecate)
│   └── queries/                 # RTK Query definitions (if separated)
├── components/                   # Global reusable components
│   ├── Avatar.tsx
│   ├── Sidebar.tsx
│   └── ...
├── config/                       # Configuration files
│   └── environment.ts
├── constants/                    # Global constants
│   └── index.ts                 # Languages, API endpoints, Socket events
├── context/                      # React Context (kept for backward compatibility)
│   └── AuthContext.tsx
├── features/                     # Feature-based modules (scalable)
│   ├── auth/
│   │   ├── components/          # Auth-specific components
│   │   │   └── LoginModal.tsx
│   │   ├── pages/               # Auth pages
│   │   │   └── LoginPage.tsx
│   │   └── hooks/               # Auth-specific hooks
│   └── chat/
│       ├── components/          # Chat-specific components
│       │   ├── ChatArea.tsx
│       │   ├── MessageItem.tsx
│       │   └── LanguageList.tsx
│       ├── pages/               # Chat pages
│       │   └── ChatPage.tsx
│       └── hooks/               # Chat-specific hooks
├── hooks/                        # Custom hooks
│   ├── useSocket.ts             # Socket.IO hooks
│   ├── state/                   # State management hooks
│   │   └── useRedux.ts          # Redux hooks with types
│   └── api/                     # API hooks (RTK Query hooks)
├── layout/                       # Layout components
│   └── MainLayout.tsx
├── middleware/                   # Custom Redux middleware
│   └── socketMiddleware.ts
├── pages/                        # Page-level components
│   └── ChatPage.tsx
├── services/                     # External services
│   ├── authService.ts
│   └── socketService.ts
├── store/                        # Redux Toolkit store
│   ├── api/                     # RTK Query API slices
│   │   ├── baseApi.ts          # Base API configuration
│   │   ├── authApi.ts          # Auth API slice
│   │   ├── chatApi.ts          # Chat API slice
│   │   └── userApi.ts          # User API slice
│   ├── slices/                  # Redux slices
│   │   ├── authSlice.ts        # Auth state
│   │   ├── chatSlice.ts        # Chat state
│   │   └── uiSlice.ts          # UI state (for future)
│   └── index.ts                # Store configuration
├── types/                        # TypeScript type definitions
│   └── index.ts
├── utils/                        # Utility functions
│   └── index.ts                # Token, user, date, error utilities
├── App.tsx                       # Root app component
└── main.tsx                      # Entry point

```

## Key Patterns

### 1. Feature-Based Structure
- Each feature is self-contained in `/features`
- Easy to scale and maintain
- Clear separation of concerns

### 2. Redux Toolkit + RTK Query
- **Slices**: Manage local state (auth, chat, UI)
- **RTK Query**: Handle API calls with caching
- **Hooks**: Type-safe hooks for state access

### 3. Custom Hooks Organization
- `/hooks/state`: Redux-related hooks
- `/hooks/api`: RTK Query mutation/query hooks
- `/hooks/useSocket`: Socket.IO integration

### 4. Utilities and Constants
- `constants/`: Languages, API endpoints, Socket events
- `utils/`: Helper functions for tokens, users, dates, errors
- `config/`: Environment variables

### 5. Services (Backward Compatible)
- `services/`: Direct API calls (can be migrated to RTK Query)
- `services/socketService`: Socket.IO management

## Usage Examples

### Redux State: Get auth user
```typescript
import { useAppSelector } from '@/hooks/state/useRedux';

const MyComponent = () => {
  const { user } = useAppSelector(state => state.auth);
  return <div>{user?.name}</div>;
};
```

### RTK Query: Fetch messages
```typescript
import { useGetMessagesByRoomQuery } from '@/store/api/chatApi';

const ChatMessages = ({ room }) => {
  const { data: messages, isLoading } = useGetMessagesByRoomQuery(room);
  return <div>{messages?.map(msg => ...)}</div>;
};
```

### Socket.IO: Join room and listen to messages
```typescript
import { useSocketRoom, useSocketMessages } from '@/hooks/useSocket';

const ChatComponent = ({ room }) => {
  useSocketRoom(room);
  
  const handleMessage = (msg) => { /* ... */ };
  useSocketMessages(handleMessage, () => {});
  
  return <div>Chat content</div>;
};
```

## Future Scalability

### For 100K+ Lines of Code:
1. ✅ Add feature-specific stores under `features/*/store/`
2. ✅ Add `middleware/` for custom Redux middleware
3. ✅ Add `validators/` for data validation
4. ✅ Add `adapters/` for API transformations
5. ✅ Add `enums/` for constants with types
6. ✅ Add `i18n/` for internationalization
7. ✅ Add `styles/` with CSS-in-JS or Tailwind organization
8. ✅ Add `tests/` with mirrors of source structure

### Recommended Additions:
- Error boundary components
- Performance monitoring
- Analytics integration
- Logger service
- Cache strategy
- Pagination utilities
- Search utilities
- Filter builders

## Migration Path from Old Structure

1. Keep existing `components/`, `pages/`, `hooks/` working
2. New features use `features/` structure
3. Gradually move old components to feature modules
4. Replace direct API calls with RTK Query
5. Replace context with Redux where needed
