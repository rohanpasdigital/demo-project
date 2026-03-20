/**
 * App.tsx - Root component with Redux Provider setup
 * Shows how to integrate Redux Toolkit with the application
 */

import { Provider } from 'react-redux';
import { store } from './store';
import ChatPage from './pages/ChatPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ChatPage />
    </Provider>
  );
}

export default App;
