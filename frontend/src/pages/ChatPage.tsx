import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import LoginModal from '../components/LoginModal';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../context/AuthContext';

const LANGUAGES = ['Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Malayalam', 'English', 'Nepali'];

const ChatPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();

  const { messages, sendMessage, error } = useChat(selectedLanguage, !!user);

  const handleSendMessage = (content: string) => {
    if (user) {
      const token = localStorage.getItem('token') || '';
      sendMessage(content, user.name, token);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        languages={LANGUAGES}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onLoginClick={() => setShowLoginModal(true)}
      />
      <ChatArea
        selectedLanguage={selectedLanguage}
        messages={messages}
        onSendMessage={handleSendMessage}
        error={error}
      />
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default ChatPage;
