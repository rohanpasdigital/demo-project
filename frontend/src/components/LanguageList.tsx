import React from 'react';

interface LanguageListProps {
  languages: string[];
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
  collapsed?: boolean;
}

const LanguageList: React.FC<LanguageListProps> = ({
  languages,
  selectedLanguage,
  onSelectLanguage,
  collapsed = false,
}) => {
  return (
    <div className="h-full flex flex-col">
      {!collapsed && (
        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Chat Rooms</h2>
      )}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {languages.map((lang) => (
            <li
              key={lang}
              className={`p-2 rounded-lg cursor-pointer transition-colors duration-200 text-sm font-medium ${
                selectedLanguage === lang 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-gray-200 text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => onSelectLanguage(lang)}
              title={lang}
            >
              <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  selectedLanguage === lang ? 'bg-white' : 'bg-gray-400'
                }`}></div>
                {!collapsed && <span>{lang}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageList;
