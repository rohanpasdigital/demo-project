import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
  activeTab: 'friends' | 'chat' | 'demo';
  onTabChange: (tab: 'friends' | 'chat' | 'demo') => void;
  onProfileClick: () => void;
  children: React.ReactNode;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLoginClick: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  activeTab,
  onTabChange,
  onProfileClick,
  children,
  isCollapsed,
  onToggleCollapse,
  onLoginClick
}) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  const tabs = [
    { id: 'friends', label: 'Friends' },
    { id: 'chat', label: 'Chat Rooms' },
    { id: 'demo', label: 'Demo' },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Main Sidebar - Professional ChatGPT/Notion Style */}
      <div className={`${isCollapsed ? 'w-16' : 'w-60'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
        {/* Header with Logo and Toggle */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'space-x-2'}`}>
              <div className="w-8 h-8 rounded-md bg-gray-900 flex items-center justify-center text-white font-semibold text-sm">
                M
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-gray-900 font-semibold text-sm">MultiChat</h1>
                </div>
              )}
            </div>
            <button
              onClick={onToggleCollapse}
              className="text-gray-600 hover:text-gray-900 focus:outline-none transition-colors p-1 hover:bg-gray-100 rounded"
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Professional Style */}
        <div className="flex-1 p-2 overflow-y-auto">
          <div className={`space-y-0.5 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as 'friends' | 'chat' | 'demo')}
                className={`w-full flex items-center px-3 py-2 rounded text-sm font-medium transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? tab.label : ''}
              >
                {!isCollapsed && <span>{tab.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Section - Bottom of Sidebar */}
        <div className="p-3 border-t border-gray-200">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} p-2 rounded hover:bg-gray-100 transition-colors`}
                title={isCollapsed ? user.name : ''}
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-900 font-semibold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {!isCollapsed && (
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                )}
                {!isCollapsed && (
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && !isCollapsed && (
                <div className="absolute bottom-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-md mb-2 z-50">
                  <button
                    onClick={() => {
                      onProfileClick();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-md border-t border-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}

              {showProfileMenu && isCollapsed && (
                <div className="absolute bottom-10 left-0 bg-white border border-gray-200 rounded-md shadow-md z-50 whitespace-nowrap">
                  <button
                    onClick={() => {
                      onProfileClick();
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-md border-t border-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className={`w-full flex items-center justify-center px-3 py-2 rounded text-sm font-medium transition-colors duration-150 bg-blue-600 hover:bg-blue-700 text-white ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? 'Login' : ''}
            >
              {!isCollapsed && <span>Login</span>}
              {isCollapsed && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
