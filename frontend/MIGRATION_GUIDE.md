/**
 * MIGRATION_GUIDE.md - Step-by-step guide to migrate existing code
 */

# Migration Guide - From Old to New Structure

## Phase 1: Setup (1-2 hours)

### 1.1 Install Dependencies
```bash
npm install @reduxjs/toolkit react-redux
```

### 1.2 Update App.tsx
```typescript
// OLD
import { AuthProvider } from './context/AuthContext';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <AuthProvider>
      <ChatPage />
    </AuthProvider>
  );
}

// NEW
import { Provider } from 'react-redux';
import { store } from './store';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Provider store={store}>
      <ChatPage />
    </Provider>
  );
}
```

## Phase 2: State Management (2-3 hours)

### 2.1 Replace useAuth() Hook
```typescript
// OLD
import { useAuth } from '@/context/AuthContext';

const component = () => {
  const { user, login, logout } = useAuth();
};

// NEW
import { useAppDispatch, useAppSelector } from '@/hooks/state/useRedux';
import { setAuthSuccess, logout } from '@/store/slices/authSlice';

const component = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  
  const login = (token, userData) => {
    dispatch(setAuthSuccess({ token, userData }));
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
};
```

### 2.2 Update authService
```typescript
// OLD
const authService = {
  login: async (username, password) => {
    const response = await axios.post('/auth/login', { username, password });
    return response.data;
  },
};

// NEW - Use RTK Query instead
import { useLoginMutation } from '@/store/api/authApi';

const [login, { isLoading }] = useLoginMutation();
const result = await login({ username, password }).unwrap();
```

## Phase 3: API Calls (2-3 hours)

### 3.1 Move API Calls to RTK Query

Create API slices in `src/store/api/`:
- `authApi.ts` - Authentication endpoints ✅ (Done)
- `chatApi.ts` - Message endpoints ✅ (Done)
- `userApi.ts` - User endpoints ✅ (Done)
- Add more as needed

```typescript
// Usage in components
import { useGetMessagesByRoomQuery } from '@/store/api/chatApi';

const ChatMessages = ({ room }) => {
  const { data: messages, isLoading } = useGetMessagesByRoomQuery(room);
  
  return messages?.map(msg => <MessageItem msg={msg} />);
};
```

### 3.2 Remove Old API Service Files
- Move logic from `services/authService.ts` to RTK Query
- Keep `services/socketService.ts` for Socket.IO

## Phase 4: Socket.IO Integration (1-2 hours)

### 4.1 Update Socket Hooks
```typescript
// OLD
const { messages, sendMessage } = useChat(selectedRoom, !!user);

// NEW
import { useSocketRoom, useSocketMessages } from '@/hooks/useSocket';

const [messages, setMessages] = useState([]);
useSocketRoom(room);
useSocketMessages(
  (msg) => setMessages(prev => [...prev, msg]),
  (msgs) => setMessages(msgs)
);
```

## Phase 5: Component Migration (4-8 hours)

### 5.1 Reorganize into Feature Modules

Move existing components to features:

```
components/ →  features/
  ├── Avatar.tsx →  features/chat/components/Avatar.tsx
  ├── ChatArea.tsx →  features/chat/components/ChatArea.tsx
  ├── MessageItem.tsx →  features/chat/components/MessageItem.tsx
  ├── Sidebar.tsx →  features/chat/components/Sidebar.tsx
  ├── LanguageList.tsx →  features/chat/components/LanguageList.tsx
  └── LoginModal.tsx →  features/auth/components/LoginModal.tsx

pages/ →  features/
  └── ChatPage.tsx →  features/chat/pages/ChatPage.tsx
```

### 5.2 Update Imports
```typescript
// OLD
import Avatar from '@/components/Avatar';

// NEW
import Avatar from '@/features/chat/components/Avatar';
```

## Phase 6: Hooks Organization (1-2 hours)

### 6.1 Reorganize Hooks
```
hooks/
  ├── useChat.ts → DEPRECATED (moved to useSocket/useSocketMessages)
  ├── useAuthForm.ts → features/auth/hooks/useAuthForm.ts
  ├── useSocket.ts ✅ (Already created)
  ├── state/
  │   └── useRedux.ts ✅ (Already created)
  └── api/
      └── (RTK Query hooks auto-generated)
```

### 6.2 Update useChat Hook
```typescript
// OLD useChat.ts - DEPRECATED
// Replaced by useSocket.ts + Redux state

// NEW
import { useSocketRoom, useSocketMessages } from '@/hooks/useSocket';

export const useChat = (room: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  useSocketRoom(room);
  useSocketMessages(
    (msg) => setMessages(prev => [...prev, msg]),
    (msgs) => setMessages(msgs)
  );
  
  return { messages };
};
```

## Phase 7: Testing & Cleanup (2-4 hours)

### 7.1 Test All Features
- [ ] Login/Register
- [ ] Join language rooms
- [ ] Send/Receive messages
- [ ] User profile
- [ ] Logout
- [ ] Error handling

### 7.2 Remove Old Files
- [ ] Delete `context/AuthContext.tsx`
- [ ] Delete old `services/authService.ts`
- [ ] Delete old `components/` (after moving to features)
- [ ] Delete old `pages/` (after moving to features)

### 7.3 Update package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

## Phase 8: Documentation & Best Practices

### 8.1 Update README
- Add section on new architecture
- Add setup instructions
- Add development guidelines

### 8.2 Create Contribution Guide
- Code style guidelines
- Component creation checklist
- API integration checklist

## Timeline

| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| 1. Setup | 1-2h | Week 1, Day 1 | Week 1, Day 1 |
| 2. State | 2-3h | Week 1, Day 1 | Week 1, Day 2 |
| 3. API | 2-3h | Week 1, Day 2 | Week 1, Day 3 |
| 4. Socket | 1-2h | Week 1, Day 3 | Week 1, Day 3 |
| 5. Components | 4-8h | Week 1, Day 4-5 | Week 2, Day 1 |
| 6. Hooks | 1-2h | Week 2, Day 1 | Week 2, Day 1 |
| 7. Testing | 2-4h | Week 2, Day 2-3 | Week 2, Day 3 |
| 8. Docs | 2h | Week 2, Day 3 | Week 2, Day 4 |

**Total: ~18-27 hours** (Can be done in 1-2 weeks)

## Rollback Plan (if needed)

Keep old context-based files in a branch:
```bash
git checkout -b old-context-backup
# Keep old code here as safety net
```

All new code uses Redux → Easy to revert if needed.

## Common Issues & Solutions

### Issue: Redux types not working
```typography
Solution: Ensure tsconfig.json has "strict": true
```

### Issue: RTK Query cache not updating
```typescript
Solution: Invalidate tags after mutations
// This is already done in authApi, chatApi, userApi
```

### Issue: Socket.IO conflicts with Redux
```typescript
Solution: Keep Socket.IO separate from Redux state
// Use separate state for socket connection
```

## Next Steps After Migration

1. Add error boundaries
2. Add loading states
3. Add offline mode
4. Add local caching
5. Add performance monitoring
6. Add analytics
7. Add A/B testing
8. Add feature flags
