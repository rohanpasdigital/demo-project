export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}

export interface Message {
  _id: string;
  room: string;
  content: string;
  sender: string;
  timestamp: string;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

export interface ChatContextType {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}
