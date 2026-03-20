import React, { useState } from 'react';
import type { Message } from '../types';
import { useAuth } from '../context/AuthContext';
import MessageItem from './MessageItem';

interface ChatAreaProps {
  selectedLanguage: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  error?: string | null;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedLanguage, messages, onSendMessage, error }) => {
  const { user } = useAuth();
  const [input, setInput] = useState('');

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
    <div className="flex-1 flex flex-col bg-white min-h-0">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-3 shadow-sm">
        <div className="flex items-center">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {selectedLanguage.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">{selectedLanguage} Room</h2>
            <p className="text-xs text-gray-500">Real-time chat</p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-2 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 py-2 bg-gradient-to-b from-gray-50 to-white min-h-0 max-h-[calc(100vh-250px)]">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10 flex flex-col items-center justify-center h-full">
            <div className="text-6xl mb-3 opacity-30">💬</div>
            <p className="text-base font-medium text-gray-600">Welcome to {selectedLanguage} chat!</p>
            <p className="text-sm text-gray-500 mt-1">Be the first to send a message.</p>
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
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={user ? "Type your message..." : "Login to send messages"}
            disabled={!user}
          />
          <button 
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            disabled={!user}
          >
            <span>Send</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
