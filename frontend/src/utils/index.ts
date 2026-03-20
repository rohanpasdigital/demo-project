/**
 * Token utility functions for secure token management
 */

export const tokenUtils = {
  get: () => localStorage.getItem('token'),
  
  set: (token: string) => {
    localStorage.setItem('token', token);
  },
  
  remove: () => {
    localStorage.removeItem('token');
  },
  
  exists: () => !!localStorage.getItem('token'),
};

/**
 * User utility functions
 */
export const userUtils = {
  get: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  set: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  remove: () => {
    localStorage.removeItem('user');
  },
};

/**
 * Date/Time utility functions
 */
export const dateUtils = {
  formatTime: (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  },

  formatFullDateTime: (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  },
};

/**
 * Error handling utility
 */
export const errorUtils = {
  getMessage: (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.data?.message) return error.data.message;
    return 'An unexpected error occurred';
  },
};

/**
 * UI persistence helpers
 */
export const uiUtils = {
  SIDEBAR_COLLAPSED_KEY: 'sidebarCollapsed',

  getSidebarCollapsed: (): boolean => {
    const value = localStorage.getItem(uiUtils.SIDEBAR_COLLAPSED_KEY);
    return value === 'true';
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    localStorage.setItem(uiUtils.SIDEBAR_COLLAPSED_KEY, String(collapsed));
  },
};
