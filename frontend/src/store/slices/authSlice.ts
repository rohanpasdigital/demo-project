/**
 * Authentication slice using Redux Toolkit
 * Manages auth state (login status, user data, tokens)
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';
import { tokenUtils, userUtils } from '../../utils';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: userUtils.get(),
  token: tokenUtils.get(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setAuthSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
      tokenUtils.set(action.payload.token);
      userUtils.set(action.payload.user);
    },
    
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      tokenUtils.remove();
      userUtils.remove();
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setAuthLoading, setAuthSuccess, setAuthError, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
