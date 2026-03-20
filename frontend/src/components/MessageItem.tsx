import React from 'react';
import type { Message } from '../types';
import Avatar from './Avatar';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex items-start space-x-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
      {/* Avatar */}
      <Avatar name={message.sender} size={34} />

      {/* Message Bubble */}
      <div className="flex-1 max-w-xl">
        <div className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm">
          {/* Sender Name */}
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900 text-sm">{message.sender}</span>
            <span className="text-xs text-gray-400">
              {formatTime(message.timestamp)}
            </span>
          </div>

          {/* Message Content */}
          <p className="text-gray-700 text-sm leading-snug break-words">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
