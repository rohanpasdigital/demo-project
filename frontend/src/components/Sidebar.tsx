import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LanguageList from './LanguageList';
import { useAppDispatch, useAppSelector } from '../hooks/state/useRedux';
import { toggleSidebarCollapsed } from '../store/slices/chatSlice';

interface SidebarProps {
  languages: string[];
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
  onLoginClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  languages,
  selectedLanguage,
  onSelectLanguage,
  onLoginClick,
}) => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.chat.sidebarCollapsed);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarCollapsed());
    setShowProfile(false);
  };

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-200`}> 
      {/* Header */}
      <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
            M
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">MultiChat</h1>
              <p className="text-blue-100 text-xs">Language Rooms</p>
            </div>
          )}
        </div>
        <button
          onClick={handleToggleSidebar}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Language List */}
      <div className="flex-1 p-3 overflow-hidden">
        <LanguageList
          languages={languages}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={onSelectLanguage}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* Profile/Login Section */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        {user ? (
          <div className="relative">
            {sidebarCollapsed ? (
              // When collapsed, only show a small avatar (no dropdown)
              <div className="flex items-center justify-center">
                <div
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  title={`${user.name} (@${user.username})`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">@{user.username}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showProfile && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">@{user.username}</p>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 shadow-sm"
          >
            Login to Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
