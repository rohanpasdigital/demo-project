/**
 * Custom Redux hooks for type safety
 */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Auth hooks
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  return auth;
};

// Chat hooks
export const useChat = () => {
  const chat = useAppSelector((state) => state.chat);
  return chat;
};
