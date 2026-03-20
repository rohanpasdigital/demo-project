/**
 * Chat slice using Redux Toolkit
 * Manages chat state (selected language, socket connection, errors)
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { uiUtils } from '../../utils';

interface ChatState {
  selectedLanguage: string;
  isConnected: boolean;
  error: string | null;
  loading: boolean;
  sidebarCollapsed: boolean;
}

const initialState: ChatState = {
  selectedLanguage: 'Hindi',
  isConnected: false,
  error: null,
  loading: false,
  sidebarCollapsed: uiUtils.getSidebarCollapsed(),
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
    
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setChatError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearChatError: (state) => {
      state.error = null;
    },

    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      uiUtils.setSidebarCollapsed(state.sidebarCollapsed);
    },

    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      uiUtils.setSidebarCollapsed(action.payload);
    },
  },
});

export const {
  setSelectedLanguage,
  setConnected,
  setLoading,
  setChatError,
  clearChatError,
  toggleSidebarCollapsed,
  setSidebarCollapsed,
} = chatSlice.actions;
export default chatSlice.reducer;
