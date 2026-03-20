import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout';
import ChatRoomsLayout from './components/ChatRoomsLayout';
import FriendsPage from './pages/FriendsPage';
import DemoPage from './pages/DemoPage';
import ProfilePage from './pages/ProfilePage';
import LoginModal from './components/LoginModal';
import { useChat } from './hooks/useChat';
import { useAuth } from './context/AuthContext';
import { TOP_LANGUAGES } from './constants/languages';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'friends' | 'chat' | 'demo'>('chat');
  const [showProfile, setShowProfile] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(TOP_LANGUAGES[0]);
  const { user } = useAuth();

  const { messages, sendMessage, error } = useChat(selectedLanguage, !!user);

  const handleSendMessage = (content: string) => {
    if (user) {
      const token = localStorage.getItem('token') || '';
      sendMessage(content, user.name, token);
    }
  };

  const renderContent = () => {
    if (showProfile) {
      return <ProfilePage onClose={() => setShowProfile(false)} />;
    }

    switch (activeTab) {
      case 'friends':
        return <FriendsPage />;
      case 'demo':
        return <DemoPage />;
      case 'chat':
      default:
        return (
          <ChatRoomsLayout
            selectedLanguage={selectedLanguage}
            languages={TOP_LANGUAGES}
            messages={messages}
            onSelectLanguage={setSelectedLanguage}
            onSendMessage={handleSendMessage}
            error={error}
          />
        );
    }
  };

  return (
    <div className="w-full h-screen">
      <MainLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfileClick={() => setShowProfile(true)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onLoginClick={() => setShowLoginModal(true)}
      >
        {renderContent()}
      </MainLayout>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}

export default App;
