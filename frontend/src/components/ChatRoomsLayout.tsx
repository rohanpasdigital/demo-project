import React, { useState } from 'react';
import type { Message } from '../types';
import { useAuth } from '../context/AuthContext';
import MessageItem from './MessageItem';

interface ChatRoomsLayoutProps {
  selectedLanguage: string;
  languages: string[];
  messages: Message[];
  onSelectLanguage: (language: string) => void;
  onSendMessage: (content: string) => void;
  error?: string | null;
}

// Function to get language abbreviation in original script/form
const getLanguageAbbr = (language: string): string => {
  const abbreviations: { [key: string]: string } = {
    'English': 'En',
    'Hindi': 'ह',
    'Bengali': 'ব',
    'Telugu': 'త',
    'Marathi': 'म',
    'Tamil': 'த',
    'Urdu': 'اُ',
    'Gujarati': 'ગ',
    'Kannada': 'ಕ',
    'Odia': 'ଓ',
    'Malayalam': 'മ',
    'Nepali': 'न',
    'Assamese': 'অ',
    'Konkani': 'क',
    'Manipuri': 'ম',
    'Khasi': 'ख',
    'Maithili': 'म',
    'Santali': 'स',
    'Sindhi': 'ד',
  };
  return abbreviations[language] || language.substring(0, 2).toUpperCase();
};

const ChatRoomsLayout: React.FC<ChatRoomsLayoutProps> = ({
  selectedLanguage,
  languages,
  messages,
  onSelectLanguage,
  onSendMessage,
  error,
}) => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [messages]);

  return (
    <div className="flex h-full gap-0">
      {/* Secondary Sidebar - Chat Rooms List */}
      <div className={`${sidebarCollapsed ? 'w-0' : 'w-56'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}>
        {/* Search/Header */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Conversations</h2>
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Collapse sidebar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Rooms List */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1 p-2">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => onSelectLanguage(language)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-150 ${
                  selectedLanguage === language
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-700 text-xs font-medium">
                    {getLanguageAbbr(language)}
                  </div>
                  <p className="truncate text-sm">{language}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expand Button (when collapsed) */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="px-1.5 py-2 hover:bg-gray-100 transition-colors border-r border-gray-200"
          aria-label="Expand sidebar"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white min-h-0">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xs mr-3">
                {getLanguageAbbr(selectedLanguage)}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{selectedLanguage}</h2>
                <p className="text-xs text-gray-500">Live conversation</p>
              </div>
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Collapse language sidebar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 p-3 rounded-none">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-white min-h-0">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
              <p className="text-sm text-gray-500">No messages yet. Start the conversation.</p>
            </div>
          ) : (
            <div className="space-y-1 pb-2">
              {messages.map((msg) => (
                <MessageItem key={msg._id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder={user ? "Type a message..." : "Login to send messages"}
              disabled={!user}
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded text-sm font-medium transition-colors duration-200"
              disabled={!user}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomsLayout;
