import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import Avatar from './Avatar';

interface Message {
  _id: string;
  room: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface ChatProps {
  selectedLanguage: string;
  user: any;
}

const Chat: React.FC<ChatProps> = ({ selectedLanguage, user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string>('');

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && selectedLanguage) {
      // Leave current room if different
      if (currentRoom && currentRoom !== selectedLanguage) {
        socket.emit('leaveRoom', currentRoom);
        setMessages([]); // Clear messages when switching rooms
      }
      // Join new room
      socket.emit('joinRoom', selectedLanguage);
      setCurrentRoom(selectedLanguage);
    }
  }, [socket, selectedLanguage, currentRoom]);

  useEffect(() => {
    if (socket) {
      socket.on('previousMessages', (msgs: Message[]) => {
        setMessages(msgs);
      });

      socket.on('message', (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (!user) {
      alert('Login is required to send messages');
      return;
    }
    if (socket && input.trim()) {
      socket.emit('sendMessage', { room: selectedLanguage, content: input, sender: user.name });
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {selectedLanguage.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{selectedLanguage} Room</h2>
            <p className="text-sm text-gray-500">Real-time chat</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-lg">Welcome to {selectedLanguage} chat!</p>
            <p className="text-sm">Be the first to send a message.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg._id} className="flex items-start space-x-3">
                <Avatar name={msg.sender} size={40} />
                <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{msg.sender}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-gray-700">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={user ? "Type your message..." : "Login to send messages"}
            disabled={!user}
          />
          <button 
            onClick={sendMessage} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
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

export default Chat;