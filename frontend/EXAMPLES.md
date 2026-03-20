/**
 * EXAMPLES.md - Shows how to use the new structured codebase
 */

# Usage Examples - Production Architecture

## 1. Redux State Management

### Access Auth State
```typescript
import { useAppSelector } from '@/hooks/state/useRedux';

const MyComponent = () => {
  const { user, token, isLoading, error } = useAppSelector(state => state.auth);
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return <div>Welcome {user?.name}</div>;
};
```

### Dispatch Auth Actions
```typescript
import { useAppDispatch } from '@/hooks/state/useRedux';
import { setAuthSuccess, logout, clearError } from '@/store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  
  const handleLogin = (token, user) => {
    dispatch(setAuthSuccess({ token, user }));
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return <div>...</div>;
};
```

### Access Chat State
```typescript
import { useChat } from '@/hooks/state/useRedux';

const ChatComponent = () => {
  const { selectedLanguage, isConnected, error } = useChat();
  
  return <div>{selectedLanguage} - {isConnected ? 'Connected' : 'Offline'}</div>;
};
```

## 2. RTK Query API Calls

### Fetch Data
```typescript
import { useGetMessagesByRoomQuery } from '@/store/api/chatApi';
import { useGetProfileQuery } from '@/store/api/userApi';

const MessagesComponent = () => {
  const { data: messages, isLoading, error } = useGetMessagesByRoomQuery('Hindi');
  
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  
  return messages?.map(msg => <MessageItem key={msg._id} message={msg} />);
};

const ProfileComponent = () => {
  const { data: profile } = useGetProfileQuery();
  return <div>{profile?.name}</div>;
};
```

### Mutate Data
```typescript
import { useLoginMutation, useRegisterMutation } from '@/store/api/authApi';
import { useUpdateProfileMutation } from '@/store/api/userApi';

const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  
  const handleSubmit = async (credentials) => {
    try {
      const result = await login(credentials).unwrap();
      console.log('Logged in:', result);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};

const ProfileForm = () => {
  const [updateProfile] = useUpdateProfileMutation();
  
  const handleUpdate = async (data) => {
    await updateProfile(data);
  };
  
  return <form onSubmit={handleUpdate}>...</form>;
};
```

## 3. Socket.IO Integration

### Basic Socket Connection
```typescript
import { useSocket } from '@/hooks/useSocket';

const ChatBox = () => {
  const socket = useSocket();
  
  // Now you can use socket.sendMessage(), socket.joinRoom(), etc.
  return <div>Chat</div>;
};
```

### Join Room and Listen to Messages
```typescript
import { useSocketRoom, useSocketMessages } from '@/hooks/useSocket';
import { useState } from 'react';
import type { Message } from '@/types';

const ChatMessages = ({ room }: { room: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Automatically join room on mount
  useSocketRoom(room);
  
  // Set up message listeners
  useSocketMessages(
    (msg) => setMessages(prev => [...prev, msg]),
    (msgs) => setMessages(msgs)
  );
  
  return messages.map(msg => <MessageItem key={msg._id} message={msg} />);
};
```

## 4. Utility Functions

### Token Management
```typescript
import { tokenUtils } from '@/utils';

authService.register(name, username, email, password)
  .then(response => {
    tokenUtils.set(response.token);
    // or use setAuthSuccess action
  });

const token = tokenUtils.get();
tokenUtils.remove();
```

### User Management
```typescript
import { userUtils } from '@/utils';

const user = userUtils.get();
userUtils.set(newUser);
userUtils.remove();
```

### Date/Time Utilities
```typescript
import { dateUtils } from '@/utils';

const timeStr = dateUtils.formatTime(msg.timestamp); // "2:30 PM"
const fullStr = dateUtils.formatFullDateTime(msg.timestamp); // "Mar 17, 2024, 2:30 PM"
```

### Error Handling
```typescript
import { errorUtils } from '@/utils';

try {
  // API call
} catch (error) {
  const message = errorUtils.getMessage(error);
  console.error(message);
}
```

## 5. Constants

```typescript
import { LANGUAGES, API_ENDPOINTS, SOCKET_EVENTS } from '@/constants';

// Use constants instead of magic strings
const supportedLanguages = LANGUAGES;

const loginUrl = API_ENDPOINTS.AUTH.LOGIN;
const messagesUrl = API_ENDPOINTS.MESSAGES.GET_BY_ROOM;

const joinRoomEvent = SOCKET_EVENTS.JOIN_ROOM;
const sendMsgEvent = SOCKET_EVENTS.SEND_MESSAGE;
```

## 6. Feature-Based Component Structure

### Feature: Auth
```typescript
// features/auth/pages/LoginPage.tsx
export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  
  return <LoginForm onSubmit={login} error={error} loading={isLoading} />;
};

// features/auth/components/LoginForm.tsx
export const LoginForm = ({ onSubmit, error, loading }) => {
  return <form onSubmit={onSubmit}>...</form>;
};
```

### Feature: Chat
```typescript
// features/chat/pages/ChatPage.tsx
export const ChatPage = () => {
  const { selectedLanguage } = useChat();
  const { messages } = useGetMessagesByRoomQuery(selectedLanguage);
  
  return (
    <div>
      <Sidebar />
      <ChatArea messages={messages} />
    </div>
  );
};

// features/chat/components/ChatArea.tsx
export const ChatArea = ({ messages }) => {
  return <div>{messages?.map(msg => ...)}</div>;
};
```

## 7. Type Safety

```typescript
// All hooks are fully typed
const auth = useAppSelector(state => state.auth);
// auth is typed as AuthState

const { user, token, isLoading } = useAuth();
// Each property is correctly typed

const { data: messages } = useGetMessagesByRoomQuery(room);
// data is typed as Message[] | undefined
```

## 8. Advanced: Custom Middleware (Future)

```typescript
// middleware/socketMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import socketService from '@/services/socketService';

export const socketMiddleware: Middleware = store => next => action => {
  // Intercept actions and sync with Socket.IO if needed
  const result = next(action);
  
  if (action.type === 'chat/setSelectedLanguage') {
    // Join new room
    socketService.joinRoom(action.payload);
  }
  
  return result;
};

// Then add to store configuration
```

## 9. API Caching with RTK Query

```typescript
// RTK Query automatically caches responses
const MessageList = () => {
  // First call - API request
  const { data: messages1 } = useGetMessagesByRoomQuery('Hindi');
  
  // Second call - Returns cached data instantly
  const { data: messages2 } = useGetMessagesByRoomQuery('Hindi');
};

// Invalidate cache and refetch
const { deleteMessage } = useDeleteMessageMutation();
await deleteMessage(id);
// This automatically invalidates 'Messages' tag and refetches
```

## 10. Error Handling Pattern

```typescript
import { errorUtils } from '@/utils';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (credentials) => {
    setError(null);
    try {
      await login(credentials).unwrap();
    } catch (err) {
      const message = errorUtils.getMessage(err);
      setError(message);
    }
  };
  
  return (
    <>
      {error && <ErrorAlert message={error} />}
      <form onSubmit={handleSubmit}>...</form>
    </>
  );
};
```

---

## Migration Checklist

- [ ] Install @reduxjs/toolkit and react-redux
- [ ] Run `npm install`
- [ ] Update App.tsx with Provider wrapper
- [ ] Update existing components to use hooks from `@/hooks/state/useRedux`
- [ ] Migrate API calls to RTK Query
- [ ] Update Socket.IO integration with new hooks
- [ ] Test all features
- [ ] Update tests with Redux setup
